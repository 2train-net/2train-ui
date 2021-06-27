import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ spacing }) => ({
  root: {
    '& .form-content': {
      marginTop: spacing(3)
    }
  }
}));
