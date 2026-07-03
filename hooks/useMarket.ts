'use client';

import { usePathname } from 'next/navigation';

export function useMarket() {
  const pathname = usePathname() || '/';
  
  // Detect if path starts with /global
  const isGlobal = pathname.startsWith('/global');
  const market = isGlobal ? 'global' : 'vn';
  
  const getLocalizedPath = (path: string) => {
    // Strip leading slash and any existing market prefix
    let cleanPath = path;
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    if (cleanPath.startsWith('global/')) {
      cleanPath = cleanPath.substring(7);
    } else if (cleanPath.startsWith('global')) {
      cleanPath = '';
    } else if (cleanPath.startsWith('vn/')) {
      cleanPath = cleanPath.substring(3);
    } else if (cleanPath.startsWith('vn')) {
      cleanPath = '';
    }
    
    if (isGlobal) {
      return `/global${cleanPath ? '/' + cleanPath : ''}`;
    } else {
      return `/vn${cleanPath ? '/' + cleanPath : ''}`;
    }
  };

  return {
    market,
    isGlobal,
    getLocalizedPath,
  };
}
