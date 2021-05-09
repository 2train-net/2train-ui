import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette }: ITheme) => ({
  root: {
    backgroundColor: palette.secondary.main,
    fontWeight: 'bold'
  }
}));
