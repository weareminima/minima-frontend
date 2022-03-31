import { FC, useEffect, useRef } from 'react';

import cx from 'classnames';

import { useNumberFormatter } from '@react-aria/i18n';
import { setInteractionModality } from '@react-aria/interactions';
import { useSlider } from '@react-aria/slider';
import { useSliderState } from '@react-stately/slider';

import useStatus from '../utils';

import Thumb from './thumb';
import type { SliderProps } from './types';

const THEME = {
  dark: {
    base: 'w-full h-12 pt-8 touch-action-none',
    output:
      'absolute bottom-1 transform -translate-y-full -translate-x-1/2 text-sm text-white border border-t-0 border-l-0 border-r-0 border-dashed border-white',
    filledTrack: 'absolute left-0 h-1.5 bg-white rounded',
    track: 'w-full h-1.5 bg-gray-300 rounded opacity-20',
  },
  light: {
    base: 'w-full h-12 pt-8 touch-action-none',
    output:
      'absolute bottom-1 transform -translate-y-full -translate-x-1/2 text-sm text-gray-800 border border-t-0 border-l-0 border-r-0 border-dashed border-gray-800',
    filledTrack: 'absolute left-0 h-1.5 bg-gray-800 rounded',
    track: 'w-full h-1.5 bg-gray-300 rounded opacity-20',
  },
};

export const Slider: FC<SliderProps> = ({
  theme = 'dark',
  meta = {},
  disabled = false,
  formatOptions = { style: 'percent' },
  labelRef,
  ...rest
}: SliderProps) => {
  const st = useStatus({ meta, disabled });

  const onChangeOverride = rest.onChange
    ? (values: number[]) => rest.onChange(values[0])
    : undefined;

  const propsOverride = {
    // `useSliderState` is expecting `value` and `defaultValue` to be arrays
    value: rest.value !== undefined ? [+rest.value] : undefined,
    defaultValue: rest.defaultValue !== undefined ? [+rest.defaultValue] : undefined,
    onChange: onChangeOverride,
    isDisabled: disabled,
    // `useSliderState` expects a `label` attribute for accessibility, but this is worked around in
    // this component so that the `<label />` can be rendered outside of it
    label: 'workaround-label',
  };

  const trackRef = useRef(null);
  const sliderState = useSliderState({
    ...rest,
    ...propsOverride,
    numberFormatter: useNumberFormatter(formatOptions),
  });

  const { groupProps, trackProps, outputProps } = useSlider(
    {
      ...rest,
      ...propsOverride,
      // `rest` contains the attribute `id` and we don't want `useSlider` to receive it because it
      // assumes the label has this id so it can connect the hidden range input to it via a
      // `aria-labelledby` attribute
      // The way our forms work is that the labels are the ones connected to the input i.e. the
      // input has the `id` attribute and the label has a `for` attribute
      // For this reason, we remove the `id` attribute from the object
      id: undefined,
    },
    sliderState,
    trackRef,
  );

  // When the user clicks the external `<label />`, the hidden range input is focused but the
  // component's status isn't updated
  // Calling `setInteractionModality` make sure the component is in the focus status
  useEffect(() => {
    const label = labelRef.current;
    // Why `'keyboard'`? This is based on React Aria's on code:
    // https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/slider/src/useSlider.ts#L178-L181
    const handler = () => setInteractionModality('keyboard');

    if (label) {
      label.addEventListener('click', handler);
    }

    return () => {
      if (label) {
        label.removeEventListener('click', handler);
      }
    };
  }, [labelRef]);

  return (
    <div
      {...groupProps}
      className={cx({
        [THEME[theme].base]: true,
        'opacity-30': st === 'disabled',
      })}
    >
      <div {...trackProps} ref={trackRef} className="relative flex items-center w-full h-full">
        <output
          {...outputProps}
          className={THEME[theme].output}
          style={{
            left: `${sliderState.getThumbPercent(0) * 100}%`,
          }}
        >
          {sliderState.getThumbValueLabel(0)}
        </output>
        <div
          className={THEME[theme].filledTrack}
          style={{
            width: `${sliderState.getThumbPercent(0) * 100}%`,
          }}
        />
        <div className={THEME[theme].track} />
        <Thumb
          {...rest}
          theme={theme}
          status={st}
          sliderState={sliderState}
          trackRef={trackRef}
          isDisabled={disabled}
        />
      </div>
    </div>
  );
};

export default Slider;
