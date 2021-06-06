import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .login-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(3),
        bottom: spacing(5)
      },
      '& img': {
        height: spacing(8)
      }
    },
    '& .forgot-password': {
      float: 'right'
    },
    '& .register-link': {
      textAlign: 'center',
      '& a': {
        color: 'gray'
      }
    }
  }
}));
