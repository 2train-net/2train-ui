import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .forgot-password-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(3),
        bottom: spacing(3)
      }
    },
    '& .submit-button': {
      marginTop: spacing(2)
    }
  }
}));
