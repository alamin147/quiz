import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centerContent?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  centerContent = false,
}) => {
  const { isMobile, isTablet } = useResponsive();

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: isMobile ? 'p-2' : 'p-4',
    md: isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8',
    lg: isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12',
    xl: isMobile ? 'p-8' : isTablet ? 'p-12' : 'p-16',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centerContent && 'flex flex-col items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className,
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid',
        gridCols[columns.mobile || 1],
        columns.tablet && `md:${gridCols[columns.tablet]}`,
        columns.desktop && `lg:${gridCols[columns.desktop]}`,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

// Responsive Stack Component
interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: {
    mobile?: 'row' | 'col';
    tablet?: 'row' | 'col';
    desktop?: 'row' | 'col';
  };
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  direction = { mobile: 'col', tablet: 'row', desktop: 'row' },
  spacing = 'md',
  align = 'start',
  justify = 'start',
  className,
}) => {
  const spacingClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  };

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction.mobile || 'col'],
        direction.tablet && `md:${directionClasses[direction.tablet]}`,
        direction.desktop && `lg:${directionClasses[direction.desktop]}`,
        spacingClasses[spacing],
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
    >
      {children}
    </div>
  );
};
