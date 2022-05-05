import {
  FC,
} from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import cx from 'classnames';

import { motion } from 'framer-motion';

import Label from 'components/forms/label';
import Radio from 'components/forms/radio';

interface AnswerProps {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'submit';
  value: string;
  options?: {
    label: string;
    value: string;
  }[];
  animation: boolean;
  disabled: boolean;
}

export const Answer: FC<AnswerProps> = ({
  id,
  type,
  value,
  options,
  animation,
  disabled,
}: AnswerProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex justify-end">
      {(type === 'text' || type === 'textarea') && (
        <motion.div
          key={`${id}-answer`}
          initial={{
            opacity: animation ? 0 : 1,
            scale: animation ? 0.85 : 1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className={cx({
            'inline-flex items-center rounded-3xl py-2 px-4 max-w-[260px] overflow-hidden border border-dark/10 text-sm ': true,
          })}
          style={{
            borderRadius: '24px 24px 4px 24px',
          }}
        >
          {value}
        </motion.div>
      )}
      {type === 'radio' && (
        <motion.div
          key={`${id}-answer`}
          initial={{
            opacity: animation ? 0 : 1,
            scale: animation ? 0.85 : 1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className={cx({
            'inline-flex items-center rounded-3xl py-2 px-4 max-w-full overflow-hidden border border-dark/10 text-sm': true,
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
                          disabled={disabled}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                        <Label className="text-sm">
                          {l}
                        </Label>
                      </div>
                    );
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Answer;
