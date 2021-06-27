import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ spacing }) => ({
  root: {
    '& .master-list-content': {
      justifyContent: 'center',
      margin: {
        top: spacing(3)
      }
    },
    '& .master-list-loading': {
      textAlign: 'center',
      display: 'block',
      margin: {
        top: spacing(4),
        bottom: spacing(4)
      }
    }
  }
}));
