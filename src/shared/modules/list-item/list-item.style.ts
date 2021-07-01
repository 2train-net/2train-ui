import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, { centerContent: boolean }, ITheme>(({ palette, spacing }): any => ({
  root: ({ centerContent }: { centerContent: boolean }) => ({
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
      color: palette.secondary.main,
      paddingTop: centerContent ? spacing(1.25) : 0,
      '& .list-item-text': {
        display: centerContent ? 'flex' : '',
        alignItems: 'center',
        '& svg': {
          marginRight: spacing(1),
          marginLeft: spacing(-1),
          width: spacing(3),
          height: spacing(3)
        },
        '& span:first-child': {
          display: 'block'
        }
      }
    }
  })
}));
