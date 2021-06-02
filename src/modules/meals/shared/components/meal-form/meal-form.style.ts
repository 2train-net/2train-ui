import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .meal-image-uploader': {
      display: 'flex',
      justifyContent: 'center',
      '& div:last-child , img': {
        width: 100,
        height: 100
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
