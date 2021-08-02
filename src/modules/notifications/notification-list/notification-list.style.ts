import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ palette, spacing }): any => ({
  root: {
    width: spacing(32),
    height: spacing(45),

    '& .all-notifications': {
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid #b3b2b226',
      background: 'white',
      padding: 16
    },

    '& .no-more-to-load': {
      height: spacing(6.75)
    }
  }
}));
