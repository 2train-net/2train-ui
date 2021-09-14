import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles((theme: ITheme) => ({
  root: {
    '& .form-content': {
      height: '60vh',

      '& iframe': {
        width: '100%',
        height: '100%'
      }
    }
  }
}));
