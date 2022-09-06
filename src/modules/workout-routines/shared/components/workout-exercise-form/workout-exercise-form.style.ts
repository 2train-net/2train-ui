import { createUseStyles } from 'react-jss';
import { ITheme } from 'shared/theme';

export default createUseStyles(({ spacing }: ITheme) => ({
  inputContainer: {
    paddingLeft: [spacing(0.5), '!important'],
    paddingRight: [spacing(0.5), '!important'],
  },
  unitMeasureContainer: {
    paddingTop: [spacing(5), '!important'],
    paddingLeft: [spacing(0.5), '!important'],
    paddingRight: [spacing(0.5), '!important'],
  },
}));
