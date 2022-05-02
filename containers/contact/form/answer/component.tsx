import {
  FC,
} from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import cx from 'classnames';

import Label from 'components/forms/label';
import Radio from 'components/forms/radio';

interface AnswerProps {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  value: string;
  options?: {
    label: string;
    value: string;
  }[];
}

export const Answer: FC<AnswerProps> = ({
  id,
  type,
  options,
  value,
}: AnswerProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex justify-end">
      {(type === 'text' || type === 'textarea') && (
        <div
          className={cx({
            'inline-flex items-center rounded-3xl py-2 px-4 max-w-full overflow-hidden whitespace-nowrap border border-dark/10 text-sm': true,
          })}
          style={{
            borderRadius: '24px 24px 4px 24px',
          }}
        >
          {value}
        </div>
      )}
      {type === 'radio' && (
        <div
          className={cx({
            'inline-flex items-center rounded-3xl p-4 max-w-full overflow-hidden border border-dark/10 text-sm': true,
          })}
          style={{
            borderRadius: '24px 24px 4px 24px',
          }}
        >
          <div className="space-y-2">
            {options.map((option) => {
              const { label: l, value: v } = option;

              return (
                <Controller
                  key={v}
                  name={id}
                  control={control}
                  // rules={STEP.rules}
                  defaultValue={value}
                  render={({ field, fieldState }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Radio
                          {...field}
                          state={fieldState}
                          theme="light"
                          value={v}
                          defaultChecked={v === value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                        <Label>
                          {l}
                        </Label>
                      </div>
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Answer;
