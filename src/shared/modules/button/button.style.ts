import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

import { ButtonColor, ButtonVariant, ButtonSize } from './button.component';

const BUTTON_HEIGHT = {
  large: 6,
  medium: 5,
  small: 4
};

const BUTTON_WIDTH = {
  large: 25,
  medium: 15,
  small: 5
};

export default createUseStyles<ITheme>(({ palette, spacing }) => ({
  root: ({
    color,
    variant,
    size,
    fullWidth
  }: {
    color: ButtonColor;
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth: boolean;
  }) => ({
    color: variant === 'contained' ? 'white' : palette[color].main,
    background: variant === 'contained' ? palette[color].main : 'white',
    borderColor: palette[color].main,
    textTransform: 'none',
    borderRadius: spacing(1),
    height: spacing(BUTTON_HEIGHT[size]),
    minWidth: spacing(BUTTON_WIDTH[size]),
    boxShadow: variant === 'contained' && `$0px 4px 12px ${palette[color].light}`,
    width: fullWidth ? '100%' : undefined,
    '&:hover, &:focus, &:active ': {
      borderColor: palette[color].main,
      color: variant === 'contained' ? 'white' : palette[color].main,
      background: variant === 'contained' ? palette[color].main : 'white'
    }
  })
}));
