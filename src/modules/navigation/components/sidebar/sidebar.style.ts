import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing, breakpoints }: ITheme) => ({
  root: {
    '& aside, .ant-layout-sider-trigger, .ant-menu-dark, .ant-menu-dark .ant-menu-item > a': {
      color: 'black',
      background: 'white'
    },

    [breakpoints.down('sm')]: {
      '& .ant-layout-sider-trigger': {
        display: 'none'
      }
    },

    '& aside': {
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      zIndex: 2,

      '& .ant-menu-item-selected, .ant-menu-item-selected > a, .ant-menu-submenu .ant-menu-submenu-selected': {
        backgroundColor: `${palette.primary.main} !important`,
        '& a, svg, span': {
          color: 'white !important'
        }
      },

      '& .ant-menu .ant-menu-sub, .ant-menu-item .ant-menu-item-only-child, .ant-submenu-open': {
        backgroundColor: palette.secondary.light,
        '& a': {
          backgroundColor: palette.secondary.light,
          color: 'white'
        }
      },

      '& .ant-menu-submenu-active:hover, .ant-menu-item:hover': {
        '& svg, a, span': {
          color: palette.primary.main
        }
      },

      '& .ant-menu-submenu': {
        '& :hover, :focus,': {
          color: 'black'
        }
      },

      '&  .ant-menu-submenu .ant-menu-submenu-inline .ant-menu-submenu-open': {
        color: 'black'
      },

      '& .logo': {
        height: spacing(4),
        color: palette.primary.main,
        display: 'flex',
        margin: {
          top: spacing(1),
          bottom: spacing(3)
        },
        '& .logomark': {
          width: spacing(19),
          height: spacing(6),
          margin: 'auto'
        },
        '& .symbol': {
          width: spacing(4),
          height: spacing(4),
          margin: 'auto'
        }
      }
    }
  }
}));
