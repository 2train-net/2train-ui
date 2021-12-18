import { spacing, breakpoints } from './theme';
import { ITheme } from './theme.interface';

export const LIGHT_THEME: ITheme = {
  palette: {
    primary: {
      dark: '#D92439',
      main: '#EE4054',
      light: '#F8818D',
      contrastText: '#ffffff'
    },
    secondary: {
      dark: '#20233D',
      main: '#343756',
      light: '#616377',
      contrastText: '#ffffff'
    },
    danger: {
      main: '#ff4444',
      dark: '#CC0000'
    },
    default: {
      light: '#D9D9D9',
      main: '#C8C8C8',
      dark: '#707070'
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
      main: '#00C851',
      dark: '#007E33'
    },
    info: {
      light: '#64b5f6',
      main: '#33b5e5',
      dark: '#0099CC'
    },
    warning: {
      light: '#ffb74d',
      main: '#ffbb33',
      dark: '#FF8800'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    }
  },
  spacing,
  breakpoints
};
