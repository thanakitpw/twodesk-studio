'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import SplashScreen from './SplashScreen';

const STORAGE_KEY = 'twodesk-splash-locale';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(true);

  useEffect(() => {
    // Play splash once per session, and again whenever the locale changes
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen !== locale) {
      setShowSplash(true);
      setSplashDone(false);
    }
  }, [locale]);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, locale);
    setSplashDone(true);
    setShowSplash(false);
  }, [locale]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  );
}
