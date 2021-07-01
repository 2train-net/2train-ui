import { Breakpoint } from './breakpoint.interface';

export const DEFAULT_SPACING = 8;

export const spacing = (n: number) => n * DEFAULT_SPACING;

export const breakpoints = {
  up: (breakpoint: Breakpoint) =>
    ({
      xs: '@media (min-width: 0px)',
      sm: '@media (min-width: 600px)',
      md: '@media (min-width: 960px)',
      lg: '@media (min-width: 1280px)',
      xl: '@media (min-width: 1920px)'
    }[breakpoint]),
  down: (breakpoint: Breakpoint) =>
    ({
      xs: '@media (max-width: 599.98px)',
      sm: '@media (max-width: 959.98px)',
      md: '@media (max-width: 1279.98px)',
      lg: '@media (max-width: 1919.98px)',
      xl: '@media (max-width: 2559.98px)'
    }[breakpoint])
};
