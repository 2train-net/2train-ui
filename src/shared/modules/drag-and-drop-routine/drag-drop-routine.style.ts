import { createUseStyles } from 'react-jss';
import { ITheme } from 'shared/theme';

export default createUseStyles<string, unknown, ITheme>(({ palette, breakpoints, spacing }) => ({
  root: {
    '& .header-actions': {
      display: 'flex',
      alignItems: 'center',
      '& .select-item': {
        width: '100%',
        marginBottom: 0,
        marginRight: spacing(1)
      }
    },
    '& .ant-page-header-heading-extra': {
      width: '100%',
      marginTop: spacing(2),
      [breakpoints.up('sm')]: {
        width: spacing(30),
        marginTop: 0
      }
    },

    '& .column-header': {
      '& h5': {
        marginLeft: spacing(2)
      },
      '& button': {
        margin: spacing(0.625)
      },
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: spacing(1),
      alignItems: 'baseline',
      maxWidth: spacing(90)
    },
    '& .columns': {
      marginBottom: spacing(2),
      marginTop: spacing(2),
      [breakpoints.down('sm')]: {
        marginBottom: spacing(31.25)
      },
      '& .ant-row': {
        alignItems: 'baseline'
      }
    },
    '& .footer': {
      bottom: 0,
      [breakpoints.down('sm')]: {
        position: 'fixed',
        left: 0,
        width: '100%'
      },
      '& .field-item': {
        width: '100%',
        marginRight: spacing(1)
      },
      '& .search-container': {
        marginBottom: spacing(-2),
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    '& .create-options-container': {
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content',
      margin: 'auto',
      '& > span': {
        marginTop: spacing(1),
        marginBottom: spacing(2)
      }
    },
    '& .notVisible': {
      display: 'none'
    },
    '& .vertical-droppable, .vertical-droppable-dragging': {
      maxWidth: spacing(90),
      background: palette.default.light,
      padding: spacing(1),
      height: spacing(50),
      overflowY: 'scroll',
      position: 'static',
      '& .draggable': {
        margin: 'auto',
        marginTop: spacing(2),
        marginBottom: spacing(1),
        '& .ant-card': {
          width: [['80%'], '!important']
        }
      }
    },
    '& .vertical-droppable-dragging': {
      background: palette.secondary.light
    },
    '& .horizontal-droppable, .horizontal-droppable-dragging': {
      background: palette.default.light,
      padding: spacing(1),
      height: 'auto',
      minHeight: spacing(12.5),
      marginTop: spacing(2),
      overflowY: 'scroll',
      display: 'flex',
      position: 'sticky'
    },
    '& .draggable': {
      justifyContent: 'center',
      '& > div': {
        justifyContent: 'center',
        '& .ant-card': {
          width: [['100%'], '!important'],
          minWidth: spacing(25)
        }
      },
      maxWidth: 400,
      userSelect: 'none',
      margin: spacing(1),
      color: 'white',
      flexDirection: 'row',
      width: 'auto'
    }
  }
}));
