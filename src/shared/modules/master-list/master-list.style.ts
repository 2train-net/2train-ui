import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ spacing, breakpoints }) => ({
  root: {
    '& .master-list-content': {
      justifyContent: 'center',
      margin: {
        top: spacing(3),
      },
    },
    '& .master-list-loading': {
      textAlign: 'center',
      display: 'block',
      margin: {
        top: spacing(4),
        bottom: spacing(4),
      },
    },
    '& .search-bar': {
      display: 'flex',

      [breakpoints.up('sm')]: {
        '& .ant-form-item': {
          marginLeft: spacing(2),
          marginBottom: '0px !important',
        },
      },
    },
    '& .ant-page-header-heading-extra': {
      display: 'flex',
    },
  },
}));
