import { Breakpoint } from './breakpoint.interface';
export interface ITheme {
  palette: {
    primary: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    secondary: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    accent: {
      light?: string;
      main: string;
    };
    background: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    success: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    info: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    warning: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
    error: {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    };
  };
  spacing: (n: number) => number;
  breakpoints: { up: (breakpoint: Breakpoint) => string; down: (breakpoint: Breakpoint) => string };
}
