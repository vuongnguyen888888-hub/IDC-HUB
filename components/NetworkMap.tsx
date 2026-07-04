'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Building2, Eye } from 'lucide-react';

interface NetworkMapProps {
  activeId: string;
  onSelectDC: (id: string) => void;
}

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

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    // Create MapLibre instance with OpenFreeMap style
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/positron', // High premium, minimalist gray theme
      center: [108.2, 16.0], // Center of Vietnam
      zoom: 5.2,
      minZoom: 3,
      maxZoom: 18,
      attributionControl: false,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

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

    // Find physical site corresponding to activeId
    const targetSite = SITES.find((site) => site.dcs.includes(activeId));

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
    if (activeId === 'overview') {
      map.flyTo({
        center: [108.2, 16.0],
        zoom: 5.2,
        pitch: 0,
        bearing: 0,
        essential: true,
        duration: 1500,
      });
    } else if (targetSite) {
      map.flyTo({
        center: targetSite.coords,
        zoom: 14.5, // Detailed zoom level
        pitch: 25, // Soft cinematic pitch
        bearing: 0,
        essential: true,
        duration: 2000,
      });
    }
  }, [activeId, mapLoaded]);

  // Active address string details
  const activeSiteInfo = SITES.find((site) => site.dcs.includes(activeId));

  return (
    <div className="w-full h-full flex flex-col relative bg-slate-50 overflow-hidden rounded-2xl border border-gray-100">
      {/* Map Container Element */}
      <div id="openfreemap-viewport" ref={mapContainerRef} className="w-full flex-grow h-full" />
    </div>
  );
}
