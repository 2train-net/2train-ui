import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing }: ITheme) => ({
  root: {
    '& .start-date-col': {
      margin: 'auto',
      width: '100%'
    },

    '& .expiration-message': {
      marginTop: spacing(2),
      padding: spacing(1),
      backgroundColor: palette.default.light
    }
  }
}));
