import { FC, useRef } from 'react';

import cx from 'classnames';

// react aria
import { useButton } from '@react-aria/button'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite'; // eslint-disable-line @typescript-eslint/no-unused-vars
import SEARCH_SVG from 'svgs/ui/search.svg?sprite';

import { SIZES, THEME } from './constants';
import type { SearchProps } from './types';

export const Search: FC<SearchProps> = ({
  theme = 'dark',
  size = 'base',
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const state = useSearchFieldState(rest);

  const ref = useRef();
  const { inputProps, clearButtonProps } = useSearchField(rest, state, ref);
  const { buttonProps } = useButton(clearButtonProps, null);

  return (
    <div
      className={cx('flex w-full relative border-b border-gray-400', {
        [THEME[theme]]: true,
        [SIZES[size]]: true,
      })}
    >
      <Icon
        icon={SEARCH_SVG}
        className={cx({
          'absolute top-1/2 left-3 w-5 h-5 transform -translate-y-1/2': true,
          [THEME[theme]]: true,
        })}
      />

      <input
        {...inputProps}
        ref={ref}
        placeholder={placeholder}
        type="search"
        className={cx(
          'w-full font-sans px-10 bg-transparent truncate leading-4 placeholder-gray-300 placeholder-opacity-50',
          {
            [THEME[theme]]: true,
            [SIZES[size]]: true,
          },
        )}
      />

      {state.value !== '' && (
        <button
          {...buttonProps}
          tabIndex="clear"
          className="absolute z-10 flex items-center self-center justify-center w-5 h-5 right-3 r-2"
          type="button"
        >
          <Icon icon={CLOSE_SVG} className="inline-block w-2 h-2" />
        </button>
      )}
    </div>
  );
};

export default Search;
