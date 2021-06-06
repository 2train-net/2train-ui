import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .register-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(3),
        bottom: spacing(5)
      },
      '& img': {
        height: spacing(8)
      }
    },
    '& .submit-button': {
      margin: {
        top: spacing(8)
      }
    },
    '& .register-link': {
      textAlign: 'center',
      margin: {
        top: spacing(8)
      },
      '& a': {
        color: 'gray'
      }
    }
  }
}));
