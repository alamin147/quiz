import { useState, useEffect } from 'react';

export interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
}

export const useResponsive = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLandscape: false,
    isPortrait: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        isPortrait: height > width,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return screenSize;
};

// Utility function to get responsive classes
export const getResponsiveClasses = (
  mobile: string,
  tablet?: string,
  desktop?: string
): string => {
  let classes = mobile;
  if (tablet) classes += ` md:${tablet}`;
  if (desktop) classes += ` lg:${desktop}`;
  return classes;
};

// Hook for responsive values
export const useResponsiveValue = <T>(
  mobileValue: T,
  tabletValue?: T,
  desktopValue?: T
): T => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (isDesktop && desktopValue !== undefined) return desktopValue;
  if (isTablet && tabletValue !== undefined) return tabletValue;
  return mobileValue;
};
