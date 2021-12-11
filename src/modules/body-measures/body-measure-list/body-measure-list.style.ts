import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .content': {
      margin: {
        top: spacing(3)
      },

      '& .body-measure-container': {
        margin: {
          bottom: spacing(3)
        }
      },

      '& .body-measures-info, .body-pictures': {
        margin: {
          bottom: spacing(2)
        }
      }
    }
  }
}));
