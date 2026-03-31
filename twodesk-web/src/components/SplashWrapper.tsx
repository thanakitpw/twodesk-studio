'use client';

import { useState, useEffect, useCallback } from 'react';
import SplashScreen from './SplashScreen';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(true);

  useEffect(() => {
    // Show splash only on first visit per session
    // แสดงทุกครั้งที่ refresh (เปลี่ยนเป็น sessionStorage ทีหลัง)
    setShowSplash(true);
    setSplashDone(false);
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('twodesk-splash', '1');
    setSplashDone(true);
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  );
}
