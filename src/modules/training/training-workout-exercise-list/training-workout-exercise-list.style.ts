import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ spacing }): any => ({
  root: {
    height: '100%',
    marginTop: spacing(3),

    '& .title': {
      marginLeft: spacing(3)
    },

    '& .ant-skeleton': {
      marginLeft: spacing(3),
      marginRight: spacing(3),
      marginTop: spacing(3)
    },

    '& .submit-button': {
      marginTop: spacing(5),
      justifyContent: 'center',
      paddingRight: spacing(4),
      paddingLeft: spacing(4)
    }
  }
}));
