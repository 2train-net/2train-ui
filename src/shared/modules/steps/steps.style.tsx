import { createUseStyles } from 'react-jss';
import { ITheme } from 'shared/theme';
import { StepColor } from './steps.component';

export default createUseStyles<ITheme>(({ palette }) => ({
  root: ({ color }: { color: StepColor }) => ({
    '& .ant-steps-item-process .ant-steps-item-icon ': {
      borderColor: palette[color].main,
      backgroundColor: palette[color].main
    },
    '& .ant-steps-item-finish ': {
      '&:after': {
        backgroundColor: [[palette[color].main], '!important']
      },
      '& .ant-steps-item-container ': {
        '& .ant-steps-item-icon': {
          borderColor: palette[color].main,
          '& svg': {
            fill: palette[color].main
          }
        }
      }
    }
  })
}));
