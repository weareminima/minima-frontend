import { FC, useRef } from 'react';

import cx from 'classnames';

import { useFocusRing } from '@react-aria/focus';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import type { ThumbProps } from './types';

const THEME = {
  dark: {
    thumb:
      'absolute top-0 w-4 h-4 transform -translate-x-1/2 rounded-full bg-gray-700 border-2 z-10 cursor-move',
    status: {
      default: 'border-white',
      dragging: 'border-white opacity-80',
      focused: 'border-white ring-2 ring-blue-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-white',
    },
  },
  light: {
    thumb:
      'absolute top-0 w-4 h-4 transform -translate-x-1/2 rounded-full bg-gray-700 border-2 cursor-move',
    status: {
      default: 'border-white',
      dragging: 'border-white opacity-80',
      focused: 'border-white ring-2 ring-blue-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-white',
    },
  },
};

export const Thumb: FC<ThumbProps> = ({
  theme,
  status: rawState,
  sliderState,
  trackRef,
  isDisabled,
  id = undefined,
  ...rest
}: ThumbProps) => {
  const inputRef = useRef(null);
  const { thumbProps, inputProps } = useSliderThumb(
    {
      ...rest,
      id,
      index: 0,
      trackRef,
      inputRef,
      isDisabled,
    },
    sliderState,
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  let status: keyof typeof THEME.dark.status;
  if (isFocusVisible) {
    status = 'focused';
  } else if (sliderState.isThumbDragging(0)) {
    status = 'dragging';
  } else if (rawState === 'none') {
    status = 'default';
  } else {
    status = rawState;
  }

  const mergedInputProps = mergeProps(inputProps, focusProps, {
    // If `Slider` receives an `id` prop, `Thumb` receives it too, otherwise we default to what
    // `inputProps` provides
    id: id ?? inputProps.id,
  });

  return (
    <div
      {...thumbProps}
      className={cx({
        [THEME[theme].thumb]: true,
        [THEME[theme].status[status]]: true,
      })}
      style={{
        left: `${sliderState.getThumbPercent(0) * 100}%`,
      }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergedInputProps} />
      </VisuallyHidden>
    </div>
  );
};

export default Thumb;
