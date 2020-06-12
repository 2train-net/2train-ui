import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<ITheme>(({ palette, spacing, breakpoints }) => ({
  root: {
    '& .confirm-account-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(2.5),
        bottom: spacing(2.5)
      }
    },
    '& .login-link': {
      textAlign: 'center',
      margin: {
        top: 60
      },
      '& a': {
        color: 'gray'
      }
    }
  }
}));
