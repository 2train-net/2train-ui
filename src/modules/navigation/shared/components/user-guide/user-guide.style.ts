import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

export default createUseStyles(({ palette, spacing }: ITheme) => ({
  root: {
    marginBottom: spacing(8),

    '& .ant-collapse-item': {
      boxShadow: '0 1px 4px 0 rgb(0 0 0 / 12%)',
      marginBottom: spacing(2)
    },

    '& .ant-collapse-header': {
      padding: `${spacing(3)}px ${spacing(2)}px !important`
    },

    '& .step-header': {
      display: 'flex',
      alignItems: 'center',

      '& :last-child': {
        marginBottom: '0px !important'
      }
    },

    '& .step-dot': {
      width: 32,
      height: 32,
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing(2),
      color: palette.secondary.main,
      backgroundColor: palette.background.dark,
      fontWeight: 'bold'
    },

    '& .step-completed': {
      color: palette.primary.contrastText,
      backgroundColor: palette.primary.main
    },

    '& .footer': {
      bottom: 0,
      paddingLeft: 24,
      paddingRight: 24,
      marginLeft: -24,
      marginRight: -24,
      backgroundColor: 'white',
      boxShadow: '0 -4px 8px 0 rgb(0 0 0 / 4%)',
      display: 'flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      padding: spacing(3),
      position: 'absolute',
      width: '100%'
    }
  }
}));
