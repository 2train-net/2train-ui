import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ palette, spacing }): any => ({
  root: {
    display: 'flex',
    height: spacing(8),
    alignItems: 'center',
    fontSize: 12,
    borderBottom: '1px solid #b3b2b226',
    padding: '12px 16px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgb(244, 245, 247)'
    },

    '& .new-notification': {
      minWidth: spacing(0.5),
      minHeight: spacing(0.5),
      borderRadius: '50%',
      backgroundColor: palette.primary.main
    },

    '& .icon-avatar': {
      minWidth: spacing(4),
      minHeight: spacing(4),
      borderRadius: '50%',
      color: 'white',
      display: 'flex',

      '& .icon': {
        margin: 'auto',
        fontSize: spacing(2)
      }
    }
  }
}));
