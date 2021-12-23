import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles<string, 'root', ITheme>(({ palette, spacing }) => ({
  root: {
    right: 32,
    bottom: 32,
    position: 'fixed',

    '& button': {
      backgroundColor: palette.primary.main,
      width: '64px !important',
      height: '64px !important',
      borderRadius: '100% !important',
      border: 'none',
      outline: 'none',
      color: palette.primary.contrastText,
      fontSize: 36,
      minWidth: '0px !important',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.23)'
    },

    '& ul': {
      left: 0,
      right: 0,
      textAlign: 'center',
      position: 'absolute',
      bottom: 64,
      margin: 0,
      paddingLeft: 0,
      listStyleType: 'none',

      '& li': {
        marginBottom: spacing(2),
        display: 'inline-block',

        '& .action-link': {
          zIndex: 1,
          padding: 0,
          width: 40,
          height: 40,
          lineHeight: 40,
          display: 'flex',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '50%',
          alignItems: 'center',
          position: 'relative',
          verticalAlign: 'middle',
          justifyContent: 'center',
          transition: 'background-color .3s',
          color: palette.secondary.contrastText,
          backgroundColor: palette.secondary.main,

          '& .icon': {
            position: 'absolute',
            fontSize: 16
          }
        }
      }
    },

    '& .fade-out': {
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0s linear 300ms, opacity 300ms'
    },

    '& .fade-in': {
      visibility: 'visible',
      opacity: 1,
      transition: 'visibility 0s linear 0s, opacity 300ms',
      transform: 'scale(1) translateY(0px) translateX(0px)'
    }
  }
}));
