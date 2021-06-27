import { createUseStyles } from 'react-jss';
import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  root: {
    '& .circle-container': {
      marginTop: spacing(3),
      justifyContent: 'center',
      display: 'flex',
      '& .ant-input-affix-wrapper': {
        height: spacing(25),
        width: spacing(25),
        borderRadius: '50%',
        display: 'flex',
        fontSize: spacing(3),
        '& input': {
          height: spacing(23),
          width: spacing(23),
          marginLeft: spacing(3),
          fontSize: spacing(7),
          textAlign: 'center'
        }
      },
      '& input': {
        height: spacing(25),
        width: spacing(25),
        borderRadius: '50%',
        display: 'inline-block',
        fontSize: spacing(7),
        textAlign: 'center'
      }
    }
  }
}));
