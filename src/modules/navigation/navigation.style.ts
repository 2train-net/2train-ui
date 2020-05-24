import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette }: ITheme) => ({
  root: ({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) => ({
    minHeight: '100vh',
    '& .ant-layout, header': {
      background: palette.background.main,
      color: '#141414 !important'
    },
    '& header': {
      zIndex: 1,
      width: '100%',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: {
        right: 15,
        left: 15
      }
    },
    '& main': {
      overflow: 'initial',
      margin: {
        top: 64,
        left: isSidebarCollapsed ? 80 : 200
      },
      padding: {
        right: 15,
        left: 15,
        top: 10,
        bottom: 10
      }
    }
  })
}));
