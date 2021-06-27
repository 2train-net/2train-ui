import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ palette, spacing }) => ({
  root: {
    maxWidth: spacing(25),
    '& div': {
      margin: 'auto',
      textAlign: 'center',
      '& .icon': {
        color: palette.default.dark,
        fontSize: spacing(6)
      },
      '& .title': {
        color: palette.default.dark,
        marginTop: spacing(1)
      }
    },
    textAlign: 'center',
    '& button': {
      marginTop: spacing(3)
    }
  }
}));
