import React, { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/**
 * Presentation-only button component. Accepts any standard button props.
 */
export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={clsx('btn', className)} {...props}>
    {children}
  </button>
);

