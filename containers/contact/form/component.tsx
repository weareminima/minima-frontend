import {
  FC, useCallback, useMemo, useState,
} from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Input from 'components/forms/input';

import Answer from './answer';
import { STEPS } from './constants';
import Question from './question';

interface ContactFormProps {}

type Inputs = {
  name: string;
  email: string;
};

export const ContactForm: FC<ContactFormProps> = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
  });
  const { handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback((data: Inputs) => {
    if (step !== STEPS.length - 1) {
      setInputs({
        ...inputs,
        ...data,
      });

      setStep(step + 1);
    } else {
      console.info('submit', {
        ...inputs,
        ...data,
      });
    }
  }, [step, inputs]);

  const STEP = useMemo(() => STEPS[step], [step]);

  const INPUT_KEYS = useMemo(() => Object.keys(inputs), [inputs]).filter((key) => inputs[key]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="p-6 space-y-4">
        {INPUT_KEYS
          .map((key, i) => {
            const OLD_STEP = STEPS.find((s) => s.id === key);
            return (
              <div className="block space-y-4" key={key}>
                <Question
                  id={OLD_STEP?.id}
                  index={i}
                  text={OLD_STEP?.question}
                  animation={false}
                />

                <Answer
                  text={inputs[key]}
                />
              </div>
            );
          })}

        <div>
          <Question
            key={STEP?.id}
            id={STEP?.id}
            index={INPUT_KEYS.length}
            text={STEP?.question}
            animation
          />
        </div>
      </div>

      <footer className="flex items-center justify-between p-4 border-t border-dark/10">
        <Controller
          key={STEP.id}
          name={STEP.id as keyof Inputs}
          control={control}
          rules={STEP.rules}
          defaultValue={STEP.defaultValue}
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                className="w-full"
                state={fieldState}
                theme="minimal"
                placeholder="Escribe aquí"
              />
            );
          }}
        />
      </footer>
    </form>
  );
};

export default ContactForm;
