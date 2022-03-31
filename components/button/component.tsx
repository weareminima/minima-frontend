import { FC } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { THEME, SIZE } from './constants';
import type { ButtonProps, AnchorProps, Overload } from './types';

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps => 'href' in props;

function buildClassName({
  className, disabled, size, theme,
}) {
  return cx({
    'flex items-center justify-center rounded-3xl': true,
    [THEME[theme]]: true,
    [SIZE[size]]: true,
    [className]: !!className,
    'opacity-50 pointer-events-none': disabled,
  });
}

export const LinkAnchor: FC<AnchorProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  href,
  anchorLinkProps,
  ...restProps
}: AnchorProps) => (
  <Link href={href} {...anchorLinkProps}>
    <a
      className={buildClassName({
        className,
        disabled,
        size,
        theme,
      })}
      {...restProps}
    >
      {children}
    </a>
  </Link>
);

export const Anchor: FC<AnchorProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  href,
  ...restProps
}: AnchorProps) => {
  // Anchor element doesn't support disabled attribute
  // https://www.w3.org/TR/2014/REC-html5-20141028/disabled-elements.html
  if (disabled) {
    return <span {...restProps}>{children}</span>;
  }
  return (
    <a
      href={href}
      className={buildClassName({
        className,
        disabled,
        size,
        theme,
      })}
      {...restProps}
    >
      {children}
    </a>
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  ...restProps
}: ButtonProps) => (
  <button
    type="button"
    className={buildClassName({
      className,
      disabled,
      size,
      theme,
    })}
    disabled={disabled}
    {...restProps}
  >
    {children}
  </button>
);

export const LinkButton: Overload = (props: ButtonProps | AnchorProps) => {
  // We consider a link button when href attribute exits
  if (hasHref(props)) {
    const { href } = props;
    if (href.startsWith('http')) {
      return <Anchor {...props} />;
    }
    return <LinkAnchor {...props} />;
  }
  return <Button {...props} />;
};

export default LinkButton;
