import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing, breakpoints }: ITheme) => ({
  root: {
    '& .menu-icon': {
      position: 'absolute',
      color: 'white',
      left: spacing(2),
      fontSize: spacing(3),
      margin: {
        top: spacing(2.5)
      }
    },
    [breakpoints.up('md')]: {
      '& .menu-icon': {
        display: 'none'
      },

      '& .notification-badge': {
        '& sup': {
          background: `${palette.primary.main} !important`
        }
      }
    },
    '& .nav-item': {
      margin: {
        left: spacing(2)
      }
    },
    '& .ant-avatar': {
      backgroundColor: palette.secondary.main,
      fontWeight: 'bold'
    },

    '& .notification-badge': {
      '& sup': {
        background: palette.secondary.main
      }
    }
  },
  notificationsCard: {
    '& .ant-popover-title': {
      top: 0,
      position: 'sticky',
      padding: spacing(2),
      backgroundColor: 'white'
    },

    '& .ant-popover-inner-content': {
      padding: spacing(0)
    }
  },
  notificationMiniBadge: {
    '& .ant-badge-count': {
      minWidth: spacing(1.5),
      height: spacing(1.5),
      marginRight: spacing(0.25),
      marginTop: spacing(0.5)
    }
  }
}));
