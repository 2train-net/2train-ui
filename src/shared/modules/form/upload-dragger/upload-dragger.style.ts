import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles((theme: ITheme) => ({
  root: {
    width: '100%',
    height: '100%',

    '& .ant-form-item-control-input, .ant-form-item-control-input-content': {
      width: '100%',
      height: '100%'
    }
  }
}));
