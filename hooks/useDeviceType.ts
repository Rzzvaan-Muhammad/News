import { useEffect, useState } from 'react';

export const useDeviceType = (desktopWidth = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < desktopWidth);
    };

    checkDeviceType();

    const handleResize = () => {
      checkDeviceType();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [desktopWidth]);

  return isMobile;
};
