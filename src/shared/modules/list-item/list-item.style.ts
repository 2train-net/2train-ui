import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<ITheme>(({ palette, spacing }): any => ({
  root: {
    borderLeftColor: palette.secondary,
    borderLeftStyle: 'solid',
    marginTop: spacing(4),
    minHeight: spacing(6),
    padding: {
      right: spacing(3),
      left: spacing(3)
    },
    '& .list-item-content': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& .list-item-text': {
        '& span:first-child': {
          display: 'block'
        }
      },
      '& .list-item-actions': {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: spacing(3),
        '& button': {
          marginLeft: spacing(1)
        }
      }
    }
  }
}));
