import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

const BORDER_LEFT_LINE = 3;

export default createUseStyles<string, { centerContent: boolean; isLeftBorderVisible: boolean }, ITheme>(
  ({ palette, spacing }): any => ({
    root: ({ centerContent, isLeftBorderVisible }: { centerContent: boolean; isLeftBorderVisible: boolean }) => ({
      borderLeftColor: palette.secondary,
      borderLeftStyle: isLeftBorderVisible ? 'solid' : 'hidden',
      borderLeftSize: BORDER_LEFT_LINE,
      marginTop: spacing(4),
      minHeight: spacing(6),
      padding: {
        right: spacing(3),
        left: spacing(3) - BORDER_LEFT_LINE
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
  })
);
