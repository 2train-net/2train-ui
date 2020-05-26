import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing, breakpoints }: ITheme) => ({
  root: {
    '& .menu-icon': {
      position: 'absolute',
      color: 'white',
      left: spacing(2),
      fontSize: spacing(3),
      margin: {
        top: spacing(2.5)
      }
    },
    [breakpoints.up('md')]: {
      '& .menu-icon': {
        display: 'none'
      }
    },
    '& .nav-item': {
      margin: {
        left: spacing(2)
      }
    },
    '& .ant-avatar': {
      backgroundColor: palette.secondary.main,
      fontWeight: 'bold'
    },
    '& sup': {
      background: palette.secondary.main
    }
  }
}));
