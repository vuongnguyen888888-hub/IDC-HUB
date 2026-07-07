'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Building2, Eye, Compass, Search, X, ChevronDown, Check, Loader2, Navigation } from 'lucide-react';

interface NetworkMapProps {
  activeId: string;
  onSelectDC: (id: string) => void;
}

function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371; // Earth's radius in km
  const lon1 = coord1[0] * Math.PI / 180;
  const lat1 = coord1[1] * Math.PI / 180;
  const lon2 = coord2[0] * Math.PI / 180;
  const lat2 = coord2[1] * Math.PI / 180;

  const dLon = lon2 - lon1;
  const dLat = lat2 - lat1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const updateRouteLine = (map: maplibregl.Map, start: [number, number], end: [number, number], geometry?: any) => {
  const sourceId = 'route-source';
  const layerId = 'route-layer';

  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: geometry || {
      type: 'LineString',
      coordinates: [start, end]
    }
  };

  const existingSource = map.getSource(sourceId);
  if (existingSource) {
    (existingSource as any).setData(geojson);
  } else {
    map.addSource(sourceId, {
      type: 'geojson',
      data: geojson as any
    });
  }

  if (!map.getLayer(layerId)) {
    map.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#EE0033',
        'line-width': 5.5,
        'line-opacity': 0.85
      }
    });
  }
};

const removeRouteLine = (map: maplibregl.Map) => {
  const layerId = 'route-layer';
  const sourceId = 'route-source';
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }
};

const SITES = [
  {
    id: 'hl1', // Matches hl1 / hl2 physical site
    name: 'Hòa Lạc 1 & 2',
    dcs: ['hl1', 'hl2'],
    address: 'Viettel Building, Hoa Lac Hi-Tech Park, Km29, Thang Long Avenue, Hà Nội',
    coords: [105.5250, 21.0125] as [number, number],
  },
  {
    id: 'hl3',
    name: 'Hòa Lạc 3',
    dcs: ['hl3'],
    address: 'Technical Center Building, Hi-Tech Industrial Park 1, Hoa Lac Hi-Tech Park, Hà Nội',
    coords: [105.5348, 21.0135] as [number, number],
  },
  {
    id: 'pv',
    name: 'TTDL Pháp Vân',
    dcs: ['pv'],
    address: 'Viettel Building, km1, Phap Van - Cau Gie Expressway, Hoàng Mai, Hà Nội',
    coords: [105.8436, 20.9615] as [number, number],
  },
  {
    id: 'dn',
    name: 'TTDL Đà Nẵng',
    dcs: ['dn'],
    address: 'Software Park Building, No. 02 Quang Trung, Hải Châu, Đà Nẵng',
    coords: [108.2215, 16.0783] as [number, number],
  },
  {
    id: 'hht1', // Matches hht1 / hht2 / hht3 physical site
    name: 'TTDL Hoàng Hoa Thám',
    dcs: ['hht1', 'hht2', 'hht3'],
    address: '158/2A Alley, Hoang Hoa Tham, Bay Hien Ward, Tan Binh, TP. HCM',
    coords: [106.6508, 10.8016] as [number, number],
  },
  {
    id: 'bd',
    name: 'TTDL Bình Dương',
    dcs: ['bd'],
    address: 'Viettel IDC Building, DT743 Street, Binh Hoa Ward, Thuận An, Bình Dương',
    coords: [106.7218, 10.9168] as [number, number],
  }
];

const TERRITORIES = [
  {
    id: 'hoangsa',
    name: 'Quần đảo Hoàng Sa',
    fullName: 'Quần đảo Hoàng Sa (Việt Nam)',
    coords: [112.2, 16.5] as [number, number],
    description: 'Huyện đảo Hoàng Sa thuộc Thành phố Đà Nẵng, Việt Nam.'
  },
  {
    id: 'truongsa',
    name: 'Quần đảo Trường Sa',
    fullName: 'Quần đảo Trường Sa (Việt Nam)',
    coords: [111.9, 8.6] as [number, number],
    description: 'Huyện đảo Trường Sa thuộc Tỉnh Khánh Hòa, Việt Nam.'
  }
];

export default function NetworkMap({ activeId, onSelectDC }: NetworkMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Search & Routing states
  const [startPoint, setStartPoint] = useState<{ coords: [number, number]; label: string } | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const startMarkerRef = useRef<maplibregl.Marker | null>(null);
  const mapClickHandlerRef = useRef<(coords: [number, number]) => void>(() => {});

  // Keep reference of onSelectDC to avoid restarting/recreating map on parent renders
  const onSelectDCRef = useRef(onSelectDC);
  useEffect(() => {
    onSelectDCRef.current = onSelectDC;
  }, [onSelectDC]);

  // Keep reference of activeId to avoid stale closures in marker click events
  const activeIdRef = useRef(activeId);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const isFirstSyncRef = useRef(true);
  // Sync selectedSiteId with activeId from parent
  useEffect(() => {
    if (isFirstSyncRef.current) {
      isFirstSyncRef.current = false;
      return;
    }
    const targetSite = SITES.find((s) => s.dcs.includes(activeId));
    if (targetSite) {
      const tid = targetSite.id;
      setTimeout(() => {
        setSelectedSiteId((prev) => (prev !== tid ? tid : prev));
      }, 0);
    } else if (activeId === 'overview') {
      setTimeout(() => {
        setSelectedSiteId((prev) => (prev !== '' ? '' : prev));
      }, 0);
    }
  }, [activeId]);

  // Click outside to hide geocoding suggestions
  useEffect(() => {
    const handleGlobalClick = () => {
      setShowSuggestions(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Set map click ref handler to avoid stale closures
  useEffect(() => {
    mapClickHandlerRef.current = (coords) => {
      setStatusMessage('Đang lấy thông tin địa chỉ...');
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const label = data && (data.display_name || data.name)
            ? data.display_name.split(',').slice(0, 3).join(',').trim()
            : `Tọa độ: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`;
          setStartPoint({ coords, label });
          setSearchQuery(label);
          setStatusMessage(null);
        })
        .catch(() => {
          const label = `Tọa độ: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`;
          setStartPoint({ coords, label });
          setSearchQuery(label);
          setStatusMessage(null);
        });
    };
  }, []);

  // Geocoding query debounce
  useEffect(() => {
    if (searchQuery.trim().length < 3 || startPoint?.label === searchQuery) {
      setTimeout(() => {
        setSuggestions((prev) => (prev.length > 0 ? [] : prev));
      }, 0);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=vn&limit=5`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Error fetching geocoding suggestions:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, startPoint]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    // Create MapLibre instance with OpenFreeMap style
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/positron', // High premium, minimalist gray theme
      center: [108.5, 16.2], // Center of Vietnam showing full shape
      zoom: 4.9,
      minZoom: 3,
      maxZoom: 18,
      attributionControl: false,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      setMapLoaded(true);

      // Filter map style layers to keep only country names and remove local details
      const style = map.getStyle();
      if (style && style.layers) {
        style.layers.forEach((layer) => {
          if (layer.type === 'symbol') {
            const id = layer.id.toLowerCase();
            const isCountryOrContinent = id.includes('country') || id.includes('continent');
            const isLocalLabel = id.includes('city') || id.includes('town') || id.includes('village') || id.includes('hamlet') || id.includes('suburb') || id.includes('neighbourhood') || id.includes('state') || id.includes('province') || id.includes('region') || id.includes('county') || id.includes('district') || id.includes('local');
            
            if (isLocalLabel && !isCountryOrContinent) {
              try {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
              } catch (e) {
                // Ignore layer changes if not fully compatible
              }
            }

            if (isCountryOrContinent) {
              try {
                map.setLayoutProperty(layer.id, 'text-field', ['coalesce', ['get', 'name:en'], ['get', 'name']]);
                map.setLayoutProperty(layer.id, 'text-size', 9.5);
              } catch (e) {
                // Ignore layer changes if not fully compatible
              }
            }

            // Exclude "South China Sea" and "Biển Đông" from all text/symbol layers
            try {
              const existingFilter = map.getFilter(layer.id) as any;
              let newFilter;
              const excludeConditions = [
                ['!=', ['coalesce', ['get', 'name:en'], ['get', 'name'], ''], 'South China Sea'],
                ['!=', ['coalesce', ['get', 'name:vi'], ['get', 'name'], ''], 'Biển Đông'],
                ['!=', ['coalesce', ['get', 'name:en'], ['get', 'name'], ''], 'South China sea']
              ];
              if (!existingFilter) {
                newFilter = ['all', ...excludeConditions];
              } else if (Array.isArray(existingFilter) && existingFilter[0] === 'all') {
                newFilter = [...existingFilter, ...excludeConditions];
              } else {
                newFilter = ['all', existingFilter, ...excludeConditions];
              }
              map.setFilter(layer.id, newFilter as any);
            } catch (err) {
              // Ignore filtering errors
            }
          }
        });
      }
    });

    // Handle clicks on map to set start point
    map.on('click', (e) => {
      mapClickHandlerRef.current([e.lngLat.lng, e.lngLat.lat]);
    });

    // Generate Custom HTML Markers for Data Centers
    SITES.forEach((site) => {
      // Create HTML Element for marker
      const markerEl = document.createElement('div');
      markerEl.className = 'relative flex items-center justify-center cursor-pointer group-marker';
      markerEl.style.width = '36px';
      markerEl.style.height = '36px';

      // Inner structure for glowing ring and pin
      markerEl.innerHTML = `
        <div class="absolute inset-0 bg-[#EE0033]/15 rounded-full scale-100 group-hover:scale-125 transition-transform duration-300"></div>
        <div class="marker-pulse absolute w-8 h-8 bg-[#EE0033]/10 rounded-full animate-ping opacity-0"></div>
        <div class="marker-dot w-3.5 h-3.5 bg-gray-400 border border-white rounded-full shadow-md transition-all duration-300 z-10"></div>
        
        <!-- Label tooltip -->
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900/90 text-[10px] text-white font-bold whitespace-nowrap rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-250 z-20">
          ${site.name}
        </div>
      `;

      // Click Event using ref to avoid recreating
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCurrentlyActiveGroup = site.dcs.includes(activeIdRef.current);
        if (isCurrentlyActiveGroup) {
          const currIdx = site.dcs.indexOf(activeIdRef.current);
          const nextIdx = (currIdx + 1) % site.dcs.length;
          onSelectDCRef.current(site.dcs[nextIdx]);
        } else {
          onSelectDCRef.current(site.dcs[0]);
        }
      });

      // Add to map
      const marker = new maplibregl.Marker({ element: markerEl })
        .setLngLat(site.coords)
        .addTo(map);

      markersRef.current[site.id] = marker;
    });

    // Generate Custom HTML Markers for Territories (Hoàng Sa & Trường Sa) with simple black dots and text labels
    TERRITORIES.forEach((territory) => {
      const terrEl = document.createElement('div');
      terrEl.className = 'relative flex flex-col items-center justify-center cursor-default';
      terrEl.style.width = '12px';
      terrEl.style.height = '12px';

      terrEl.innerHTML = `
        <div class="w-2.5 h-2.5 bg-gray-950 border border-white rounded-full shadow-sm z-10"></div>
        
        <!-- Permanent Label underneath, simple text without button styles -->
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 text-gray-800 text-[10px] font-bold tracking-wide whitespace-nowrap bg-white/80 backdrop-blur-[2px] rounded border border-gray-200/50 shadow-sm select-none pointer-events-none">
          ${territory.fullName}
        </div>
      `;

      const terrMarker = new maplibregl.Marker({ element: terrEl })
        .setLngLat(territory.coords)
        .addTo(map);

      markersRef.current[territory.id] = terrMarker;
    });

    return () => {
      // Cleanup on unmount
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
      if (startMarkerRef.current) {
        startMarkerRef.current.remove();
        startMarkerRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle active item changes (fly to, glow selection)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // If there is a starting point, skip standard single-point flyTo as route useEffect handles zoom fitting
    if (startPoint) return;

    // Find physical site corresponding to selectedSiteId
    const targetSite = selectedSiteId ? SITES.find((site) => site.id === selectedSiteId) : undefined;

    // Update marker styles based on activeId
    SITES.forEach((site) => {
      const marker = markersRef.current[site.id];
      if (!marker) return;

      const el = marker.getElement();
      const dot = el.querySelector('.marker-dot');
      const pulse = el.querySelector('.marker-pulse');
      const wrapperRing = el.querySelector('.bg-\\[\\#EE0033\\]\\/15');

      const isActive = targetSite && targetSite.id === site.id;

      if (isActive) {
        if (dot) {
          dot.classList.remove('bg-gray-400');
          dot.classList.add('bg-[#EE0033]', 'scale-125');
          dot.setAttribute('style', 'border-color: #ffffff; box-shadow: 0 0 12px rgba(238,0,51,0.5);');
        }
        if (pulse) {
          pulse.classList.remove('opacity-0');
          pulse.classList.add('opacity-100');
        }
        if (wrapperRing) {
          wrapperRing.classList.add('scale-125', 'bg-[#EE0033]/25');
        }
      } else {
        if (dot) {
          dot.classList.remove('bg-[#EE0033]', 'scale-125');
          dot.classList.add('bg-gray-400');
          dot.setAttribute('style', 'border-color: #ffffff; box-shadow: none;');
        }
        if (pulse) {
          pulse.classList.remove('opacity-100');
          pulse.classList.add('opacity-0');
        }
        if (wrapperRing) {
          wrapperRing.classList.remove('scale-125', 'bg-[#EE0033]/25');
        }
      }
    });

    // Fly to active location or reset to overview
    if (startPoint) {
      // If there is a starting point, let the route effect handle the viewport
      return;
    }

    if (!targetSite) {
      map.flyTo({
        center: [108.5, 16.2],
        zoom: 4.9,
        pitch: 0,
        bearing: 0,
        essential: true,
        duration: 1500,
      });
    } else {
      map.flyTo({
        center: targetSite.coords,
        zoom: 14.5, // Detailed zoom level
        pitch: 25, // Soft cinematic pitch
        bearing: 0,
        essential: true,
        duration: 2000,
      });
    }
  }, [activeId, selectedSiteId, mapLoaded, startPoint]);

  // Update starting marker, route line, and fit bounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (startPoint) {
      // Create or update start marker
      if (!startMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'relative flex items-center justify-center cursor-pointer';
        el.style.width = '36px';
        el.style.height = '36px';
        el.innerHTML = `
          <div class="absolute inset-0 bg-blue-500/20 rounded-full scale-125"></div>
          <div class="absolute w-8 h-8 bg-blue-500/15 rounded-full animate-ping"></div>
          <div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg z-10 transition-all duration-300"></div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-blue-950 text-[10px] text-white font-extrabold whitespace-nowrap rounded-lg shadow-md pointer-events-none z-20 uppercase tracking-wider border border-blue-800">
            Điểm xuất phát
          </div>
        `;
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(startPoint.coords)
          .addTo(map);
        startMarkerRef.current = marker;
      } else {
        startMarkerRef.current.setLngLat(startPoint.coords);
      }

      // Draw or update route line
      const targetSite = SITES.find((s) => s.id === selectedSiteId);
      if (targetSite) {
        updateRouteLine(map, startPoint.coords, targetSite.coords, routeGeometry);

        // Fit bounds to show the entire road geometry, or fallback to the two endpoints
        const bounds = new maplibregl.LngLatBounds();
        if (routeGeometry && routeGeometry.coordinates) {
          routeGeometry.coordinates.forEach((coord: [number, number]) => {
            bounds.extend(coord);
          });
        } else {
          bounds.extend(startPoint.coords);
          bounds.extend(targetSite.coords);
        }

        map.fitBounds(bounds, {
          padding: { top: 90, bottom: 220, left: 60, right: 60 },
          maxZoom: 15,
          duration: 1200
        });
      } else {
        removeRouteLine(map);
        // No target site chosen yet, fly to the selected start point so the map doesn't stand still!
        map.flyTo({
          center: startPoint.coords,
          zoom: 14,
          pitch: 0,
          bearing: 0,
          essential: true,
          duration: 1200
        });
      }
    } else {
      if (startMarkerRef.current) {
        startMarkerRef.current.remove();
        startMarkerRef.current = null;
      }
      removeRouteLine(map);

      // If we cleared startPoint, reset map zoom to target site or overview
      const targetSite = SITES.find((s) => s.id === selectedSiteId);
      if (targetSite) {
        map.flyTo({
          center: targetSite.coords,
          zoom: 14.5,
          pitch: 25,
          bearing: 0,
          essential: true,
          duration: 1500,
        });
      } else {
        map.flyTo({
          center: [108.5, 16.2],
          zoom: 4.9,
          pitch: 0,
          bearing: 0,
          essential: true,
          duration: 1500,
        });
      }
    }
  }, [startPoint, selectedSiteId, routeGeometry, mapLoaded]);

  // Geolocation Handler
  const handleUseMyLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!navigator.geolocation) {
      setStatusMessage('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }

    setIsLocating(true);
    setStatusMessage('Đang kết nối GPS...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        let friendlyName = 'Vị trí của bạn';
        
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}`);
          if (res.ok) {
            const data = await res.json();
            friendlyName = data.display_name
              ? data.display_name.split(',').slice(0, 3).join(',').trim()
              : 'Vị trí của bạn';
          }
        } catch (err) {
          console.error(err);
        }

        setStartPoint({ coords, label: friendlyName });
        setSearchQuery(friendlyName);
        setIsLocating(false);
        setStatusMessage(null);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        setStatusMessage('Không thể lấy vị trí GPS. Hãy nhập vị trí thủ công hoặc click bản đồ.');
        setTimeout(() => setStatusMessage(null), 5000);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Fetch OSRM driving route and road distance
  useEffect(() => {
    if (!startPoint || !selectedSiteId) {
      setTimeout(() => {
        setDistanceKm((prev: number | null) => (prev !== null ? null : prev));
        setRouteGeometry((prev: any) => (prev !== null ? null : prev));
      }, 0);
      return;
    }

    const targetSite = SITES.find((s) => s.id === selectedSiteId);
    if (!targetSite) return;

    let isSubscribed = true;
    setTimeout(() => {
      setStatusMessage('Đang tính toán tuyến đường bộ...');
    }, 0);

    const startCoords = startPoint.coords;
    const endCoords = targetSite.coords;

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?overview=full&geometries=geojson`
    )
      .then((res) => {
        if (!res.ok) throw new Error('OSRM request failed');
        return res.json();
      })
      .then((data) => {
        if (!isSubscribed) return;
        if (data && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // route.distance is in meters, convert to km
          setDistanceKm(route.distance / 1000);
          setRouteGeometry(route.geometry);
          setStatusMessage(null);
        } else {
          // Fallback to straight-line distance
          const straightDist = calculateDistance(startCoords, endCoords);
          setDistanceKm(straightDist);
          setRouteGeometry(null);
          setStatusMessage('Không tìm thấy đường bộ, hiển thị đường chim bay.');
          setTimeout(() => setStatusMessage(null), 3000);
        }
      })
      .catch((err) => {
        console.error('OSRM API error:', err);
        if (!isSubscribed) return;
        // Fallback to straight-line distance on error
        const straightDist = calculateDistance(startCoords, endCoords);
        setDistanceKm(straightDist);
        setRouteGeometry(null);
        setStatusMessage('Lỗi kết nối tuyến đường bộ, hiển thị đường chim bay.');
        setTimeout(() => setStatusMessage(null), 3000);
      });

    return () => {
      isSubscribed = false;
    };
  }, [startPoint, selectedSiteId]);

  return (
    <div className="w-full h-full flex flex-col relative bg-slate-50 overflow-hidden rounded-2xl border border-gray-100 font-sans">
      <style>{`
        .maplibregl-ctrl-top-right {
          top: 76px !important;
          right: 16px !important;
          z-index: 50 !important;
        }
      `}</style>
      {/* Map Container Element */}
      <div id="openfreemap-viewport" ref={mapContainerRef} className="w-full flex-grow h-full" />

      {/* Dynamic Routing Panel Overlay */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-30 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-xl p-4 md:p-5 flex flex-col gap-3 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          {/* Start Point Input */}
          <div className="md:col-span-5 relative flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" />
              Điểm đi
            </label>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Nhấp vào bản đồ hoặc nhập địa chỉ..."
                className="w-full bg-slate-50 border border-gray-200 text-gray-900 text-xs rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold placeholder-gray-400 h-[38px]"
              />
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                title="Sử dụng GPS hiện tại"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin text-blue-500' : ''}`} />
              </button>

              {/* Geocoding suggestions dropdown */}
              {showSuggestions && searchQuery.trim().length >= 3 && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] max-h-[180px] overflow-y-auto p-1.5 space-y-0.5">
                  {isLoadingSuggestions ? (
                    <div className="text-[10px] font-semibold text-gray-400 text-center py-3 flex items-center justify-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                      Đang tìm kiếm...
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="text-[10px] font-semibold text-gray-400 text-center py-3">
                      Không tìm thấy kết quả
                    </div>
                  ) : (
                    suggestions.map((item, idx) => {
                      const label = item.display_name.split(',').slice(0, 3).join(',').trim();
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const coords: [number, number] = [parseFloat(item.lon), parseFloat(item.lat)];
                            setStartPoint({ coords, label });
                            setSearchQuery(label);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left text-[11px] font-medium text-gray-700 hover:text-white hover:bg-blue-600 rounded-lg px-2.5 py-2 transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis block"
                        >
                          {label}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Destination Dropdown */}
          <div className="md:col-span-4 flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#EE0033]" />
              Điểm đến
            </label>
            <div className="relative">
              <select
                value={selectedSiteId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedSiteId(val);
                  if (val === '') {
                    onSelectDC('overview');
                  } else {
                    const site = SITES.find((s) => s.id === val);
                    if (site) {
                      onSelectDC(site.dcs[0]);
                    }
                  }
                }}
                className="w-full bg-slate-50 border border-gray-200 text-gray-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-semibold transition-all cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap pr-8 h-[38px]"
              >
                <option value="">Chọn TTDL</option>
                {SITES.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Distance Result */}
          <div className="md:col-span-3 flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3 h-3 text-emerald-500" />
              Khoảng cách đo
            </label>
            <div className="relative">
              <div className="w-full bg-slate-50 border border-gray-200 text-gray-900 text-xs rounded-xl px-3 py-2.5 font-semibold transition-all h-[38px] flex items-center justify-between overflow-hidden">
                {distanceKm !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black text-gray-900 tracking-tight animate-fade-in">
                      {distanceKm.toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    </span>
                    <span className="text-[10px] font-black text-[#EE0033] uppercase tracking-widest">
                      km
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 animate-pulse">
                    Chờ chọn điểm đi...
                  </span>
                )}
                {startPoint && (
                  <button
                    onClick={() => {
                      setStartPoint(null);
                      setSearchQuery('');
                    }}
                    title="Xóa lộ trình"
                    className="text-gray-400 hover:text-[#EE0033] transition-colors cursor-pointer ml-2 flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Temporary status message */}
        {statusMessage && (
          <div className="text-[10px] font-bold text-[#EE0033] bg-[#EE0033]/5 border border-[#EE0033]/10 px-2.5 py-1 rounded-lg text-center animate-fade-in">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
