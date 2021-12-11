import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ breakpoints }: ITheme) => ({
  root: {
    '& .form-content': {
      height: '60vh',

      '& .ant-card, .ant-card-body': {
        height: '100%'
      },

      [breakpoints.up('md')]: {
        '& .body-pictures': {
          height: '80%'
        }
      }
    }
  }
}));
