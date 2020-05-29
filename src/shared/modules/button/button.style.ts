import { createUseStyles } from 'react-jss';

import { ITheme } from 'shared/theme';

import { ButtonColor, ButtonVariant } from './button.component';

export default createUseStyles<ITheme>(({ palette, spacing }) => ({
  root: ({ color, variant, fullWidth }: { color: ButtonColor; variant: ButtonVariant; fullWidth: boolean }) => ({
    color: variant === 'contained' ? 'white' : palette[color].main,
    background: variant === 'contained' ? palette[color].main : 'white',
    borderColor: palette[color].main,
    textTransform: 'none',
    borderRadius: spacing(1),
    height: spacing(6),
    minWidth: spacing(25),
    boxShadow: variant === 'contained' && `$0px 4px 12px ${palette[color].light}`,
    width: fullWidth ? '100%' : undefined,
    '&:hover, &:focus, &:active ': {
      borderColor: palette[color].main,
      color: variant === 'contained' ? 'white' : palette[color].main,
      background: variant === 'contained' ? palette[color].main : 'white'
    }
  })
}));
