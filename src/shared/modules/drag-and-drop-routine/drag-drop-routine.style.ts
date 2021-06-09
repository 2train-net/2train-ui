import { createUseStyles } from 'react-jss';
import { ITheme } from 'shared/theme';

export default createUseStyles<ITheme>(({ palette, spacing }) => ({
  root: {
    '& .header-actions': {
      display: 'flex',
      alignItems: 'center',
      '& .field-item, .select-item': {
        marginBottom: 0,
        marginRight: spacing(1)
      }
    },
    '& .vertical-droppable, .vertical-droppable-dragging': {
      background: palette.default.light,
      padding: spacing(1),
      height: spacing(50),
      overflowY: 'scroll',
      position: 'static'
    },
    '& .vertical-droppable-dragging': {
      background: palette.secondary.light
    },
    '& .horizontal-droppable, .horizontal-droppable-dragging': {
      background: palette.default.light,
      padding: spacing(1),
      height: 'auto',
      marginTop: spacing(2),
      overflowY: 'scroll',
      display: 'flex',
      position: 'sticky'
    },
    '& .draggable': {
      '& > div': {
        justifyContent: 'center',
        display: 'flex'
      },
      userSelect: 'none',
      margin: spacing(1),
      color: 'white',
      flexDirection: 'row',
      width: 'auto'
    }
  }
}));
