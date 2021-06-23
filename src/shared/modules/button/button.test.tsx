import React from 'react';

import { stub } from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import { JssProvider, ThemeProvider, SheetsRegistry } from 'react-jss';

import Button from './button.component';

import { LIGHT_THEME } from 'shared/theme';
import { SAVE_TEXT } from 'shared/constants';

const withTheme = (children: any) => {
  const sheets = new SheetsRegistry();

  return (
    <JssProvider registry={sheets}>
      <ThemeProvider theme={LIGHT_THEME}>{children}</ThemeProvider>
    </JssProvider>
  );
};

describe('Button', () => {
  it('should render button text', () => {
    render(withTheme(<Button type="button">{SAVE_TEXT}</Button>));

    const buttonText = screen.getByText(SAVE_TEXT);

    expect(buttonText.innerHTML).toBe(SAVE_TEXT);
  });

  it('should render loading icon inside button', () => {
    render(withTheme(<Button loading>{SAVE_TEXT}</Button>));

    const icon = screen.getByLabelText('loading');

    expect(icon.firstElementChild?.nodeName).toBe('svg');
  });

  it('should render a disabled button', () => {
    const { container } = render(withTheme(<Button disabled>{SAVE_TEXT}</Button>));

    const button = container.querySelector('button');

    expect(button?.disabled).toBeTruthy();
  });

  it('should call onClick callback when fire event click', () => {
    const onClick = stub();

    const { container } = render(withTheme(<Button onClick={onClick}>{SAVE_TEXT}</Button>));

    const button = container.querySelector('button');
    fireEvent.click(button!);

    expect(onClick.calledOnce).toBeTruthy();
  });
});
