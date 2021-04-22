import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';
import { ButtonColor } from 'shared/modules/button/button.component';

export default createUseStyles<ITheme>(({ palette, spacing }) => ({
  root: ({ color }: { color: ButtonColor }) => ({
    margin: 'auto',
    display: 'flow',
    textAlign: 'center',
    width: spacing(40),
    marginTop: spacing(10),
    boxShadow: ' 0 8px 16px 0 rgba(0,0,0,0.2)',
    '& .icon': {
      position: 'absolute',
      right: spacing(11.25),
      top: spacing(-9),
      height: spacing(11),
      color: 'white',
      width: spacing(11),
      borderRadius: '50%',
      display: 'inline-block',
      fontSize: spacing(7),
      backgroundColor: palette[color].main
    },
    '& .title': {
      marginTop: spacing(4),
      color: '#877c7c'
    },
    '& button': {
      margin: spacing(1)
    }
  })
}));
