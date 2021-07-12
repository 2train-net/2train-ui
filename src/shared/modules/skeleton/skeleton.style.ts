import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, { fullWidth: boolean }, ITheme>(() => ({
  root: ({ fullWidth }) => ({
    ...(fullWidth
      ? {
          width: '100%',
          '& span': {
            width: '100% !important'
          }
        }
      : {})
  })
}));
