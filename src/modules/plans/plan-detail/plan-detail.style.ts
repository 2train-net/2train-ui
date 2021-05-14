import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing }: ITheme) => ({
  root: {
    '& .avatar': {
      marginRight: spacing(1)
    },
    '& .icon-card': {
      margin: 'auto'
    },
    '& .info-col': {
      display: 'flex'
    },
    '& .icon-card-col': {
      marginTop: spacing(3)
    }
  }
}));
