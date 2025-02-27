import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';
import { ButtonColor } from 'shared/modules/button/button.component';

export default createUseStyles<ITheme>(({ palette, breakpoints, spacing }) => ({
  root: ({ color }: { color: ButtonColor }) => ({
    pointerEvents: 'auto',
    margin: {
      top: spacing(10),
      left: spacing(20)
    },
    display: 'flow',
    textAlign: 'center',
    width: spacing(40),
    boxShadow: ' 0 8px 16px 0 rgba(0,0,0,0.2)',

    [breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      '& .icon': {
        display: 'none'
      }
    },

    '& .icon': {
      position: 'relative',
      top: spacing(-9),
      height: spacing(11),
      color: 'white',
      width: spacing(11),
      borderRadius: '50%',
      display: 'inline-block',
      fontSize: spacing(7),
      backgroundColor: palette[color].main,

      '& .loading-spinner': {
        color: 'white',
        fontSize: 56,
        margin: -12
      }
    },
    '& .title': {
      margin: {
        top: spacing(-6),
        bottom: spacing(4)
      },
      color: '#877c7c' // TODO REPLACE THIS WITH A REAL COLOR ON THE PALLETTE
    },
    '& .confirmation-card-actions': {
      margin: {
        top: spacing(4)
      }
    }
  })
}));
