import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, 'root', ITheme>(({ palette }) => ({
  root: {
    backgroundColor: palette.primary.main,
    width: '64px !important',
    height: '64px !important',
    borderRadius: '100% !important',
    border: 'none',
    outline: 'none',
    color: palette.primary.contrastText,
    fontSize: 36,
    minWidth: '0px !important',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.23)'
  }
}));
