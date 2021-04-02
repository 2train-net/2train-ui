import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ breakpoints, spacing }: ITheme) => ({
  root: {
    margin: {
      bottom: spacing(2)
    },
    '& .profile-form-title': {
      textAlign: 'center',
      margin: {
        top: 16,
        bottom: 16
      }
    },
    '& .avatar-uploader': {
      display: 'flex',
      justifyContent: 'center',
      '& div:last-child , img': {
        borderRadius: 50
      },
      '& img': {
        width: '100%'
      }
    },
    '& .submit-button': {
      [breakpoints.down('md')]: {
        textAlign: 'center'
      }
    }
  }
}));
