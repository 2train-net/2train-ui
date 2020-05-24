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
  spacing: n => n * 8
};
