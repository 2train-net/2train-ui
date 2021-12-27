import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, breakpoints, spacing }: ITheme) => ({
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
        right: spacing(2),
        left: spacing(2)
      }
    },

    '& main': {
      overflow: 'initial',
      margin: {
        top: 64,
        left: isSidebarCollapsed ? 80 : 200
      },
      padding: {
        right: spacing(2),
        left: spacing(2),
        top: spacing(1),
        bottom: spacing(1)
      }
    },

    [breakpoints.down('sm')]: {
      '& main': {
        margin: {
          top: spacing(10),
          left: '0px !important'
        }
      },
      '& aside': {
        display: 'none'
      },
      '& header': {
        background: `${palette.primary.main} !important`
      }
    }
  }),

  userGuide: {
    '& .ant-drawer-content-wrapper': {
      width: '100% !important',

      [breakpoints.up('sm')]: {
        width: '500px !important'
      }
    }
  },

  drawer: {
    '& .ant-drawer-content-wrapper': {
      width: '200px !important'
    }
  }
}));
