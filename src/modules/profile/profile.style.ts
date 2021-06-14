import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    margin: {
      bottom: spacing(2)
    },
    '& .profile-form-title': {
      textAlign: 'center',
      margin: {
        top: spacing(2),
        bottom: spacing(2)
      }
    },
    '& .avatar-uploader': {
      display: 'flex',
      justifyContent: 'center',
      '& div:last-child , img': {
        borderRadius: spacing(6.25)
      },
      '& img': {
        width: '100%'
      }
    },
    '& .submit-button': {
      textAlign: 'center'
    }
  }
}));
