'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns true if the code is running on the client side (browser)
 * and false during server-side rendering.
 * 
 * Use this to safely access browser-only APIs like window, document, etc.
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}