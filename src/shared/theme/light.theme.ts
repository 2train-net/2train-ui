import { Breakpoint } from './breakpoint.interface';
import { ITheme } from './theme.interface';

export const LIGHT_THEME: ITheme = {
  palette: {
    primary: {
      dark: '#D92439',
      main: '#EE4054',
      light: '#F8818D'
    },
    secondary: {
      dark: '#20233D',
      main: '#343756',
      light: '#616377'
    },
    accent: {
      main: '#ff8f33',
      light: '#ffbc85'
    },
    background: {
      light: '#FAFAFA',
      main: '#F5F5F5',
      dark: '#E1E1E1'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    }
  },
  spacing: n => n * 8,
  breakpoints: {
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
  }
};
