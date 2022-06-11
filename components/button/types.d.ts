import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

import { LinkProps } from 'next/link';

export interface AnchorButtonProps {
  theme: 'primary' | 'primary-alt' | 'clean';
  size: 's' | 'base' | 'icon-s' | 'icon-base';
  className?: string;
}

// Button props
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
AnchorButtonProps & {
  href?: undefined;
};

// Anchor props
export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
AnchorButtonProps & {
  href?: string;
  disabled?: boolean;
  anchorLinkProps?: LinkProps;
};

// Input/output options
export type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};
