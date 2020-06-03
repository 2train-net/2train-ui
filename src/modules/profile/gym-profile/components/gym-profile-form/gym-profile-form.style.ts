import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ breakpoints }: ITheme) => ({
  root: {
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
