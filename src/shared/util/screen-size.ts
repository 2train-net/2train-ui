import { breakpoints } from 'shared/theme';

export const getIsMobile = () => {
  return window.matchMedia(breakpoints.down('xs').replace('@media ', '')).matches;
};
