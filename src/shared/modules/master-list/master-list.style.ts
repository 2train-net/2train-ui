import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<ITheme>(({ spacing }) => ({
  root: {
    '& .master-list-content': {
      justifyContent: 'center'
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
