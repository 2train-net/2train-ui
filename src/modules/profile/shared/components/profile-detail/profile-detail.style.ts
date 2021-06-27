import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing }: ITheme) => ({
  root: {
    '& .avatar': {
      textAlign: 'center',
      '& img, .default-avatar': {
        width: spacing(12),
        height: spacing(12),
        borderRadius: spacing(6)
      },
      '& .default-avatar': {
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        background: palette.default.light,
        justifyContent: 'center',
        '& span': {
          fontSize: spacing(7),
          margin: 'auto',
          color: palette.default.dark
        }
      },
      '& .profile-name': {
        marginTop: spacing(2)
      }
    },
    '& .profile-info': {
      '& .profile-detail-content': {
        marginTop: spacing(2),
        '& .profile-detail-item': {
          '& span:first-child': {
            display: 'block'
          },
          marginBottom: spacing(2)
        }
      }
    }
  }
}));
