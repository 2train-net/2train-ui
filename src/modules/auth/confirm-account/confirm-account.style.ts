import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<ITheme>(({ spacing }) => ({
  root: {
    '& .confirm-account-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(3),
        bottom: spacing(3)
      }
    },
    '& .login-link': {
      textAlign: 'center',
      margin: {
        top: spacing(8)
      }
    },
    '& .submit-button': {
      marginTop: spacing(2)
    }
  }
}));
