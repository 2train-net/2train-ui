import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette }: ITheme) => ({
  root: {
    '& .nav-item': {
      margin: {
        left: 15
      }
    },
    '& .ant-avatar': {
      backgroundColor: palette.secondary.main,
      fontWeight: 'bold'
    }
  }
}));
