import {
  FC, useCallback, useEffect, useMemo, useState, RefObject,
} from 'react';

import {
  useForm, FormProvider, Controller, SubmitHandler,
} from 'react-hook-form';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';

import Answer from './answer';
import { STEPS } from './constants';
import Question from './question';

interface ContactFormProps {
  scrollRef: RefObject<HTMLDivElement>;
}

type Inputs = {
  name: string;
  email: string;
  who: string;
  description: string;
  time: string;
  budget: string;
};

type Step = {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'submit';
  question: string;
  rules: any,
  defaultValue: string;
  options?: {
    label: string;
    value: string;
  }[];
};

export const ContactForm: FC<ContactFormProps> = ({
  scrollRef,
}: ContactFormProps) => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    who: '',
    description: '',
    time: '',
    budget: '',
  });

  const defaultAnimationsCompleted = useMemo(() => {
    return Object.keys(inputs).reduce((acc, k) => {
      return {
        ...acc,
        [k]: false,
      };
    }, {});
  }, [inputs]);

  const [animationsCompleted, setAnimationsCompleted] = useState(defaultAnimationsCompleted);

  const methods = useForm<Inputs>({
    mode: 'all',
  });
  const {
    control, watch, setFocus, handleSubmit, formState,
  } = methods;

  const STEP = useMemo(() => STEPS[step] as Step, [step]);

  const INPUT_KEYS = useMemo(() => Object.keys(inputs), [inputs]).filter((key) => inputs[key]);

  const watchAll = watch();
  const watchWho = watch('who');
  const watchTime = watch('time');
  const watchBudget = watch('budget');

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

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [watchWho, watchTime, watchBudget]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollRef, animationsCompleted, watchAll]);

  return (
    <FormProvider
      {...methods}
    >
      <form
        className="relative z-0"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="p-6 space-y-4">
          {INPUT_KEYS
            .map((key, i) => {
              const OLD_STEP = STEPS.find((s) => s.id === key) as Step;

              return (
                <div className="block space-y-4" key={key}>
                  <Question
                    id={OLD_STEP?.id}
                    index={i}
                    text={OLD_STEP?.question}
                    animation={false}
                  />

                  <Answer
                    id={OLD_STEP?.id}
                    type={OLD_STEP?.type}
                    options={OLD_STEP?.options}
                    value={inputs[key]}
                    animation={OLD_STEP?.type !== 'radio'}
                  />
                </div>
              );
            })}

          <div className="space-y-4">
            <Question
              id={STEP?.id}
              key={STEP?.id}
              index={INPUT_KEYS.length}
              text={STEP?.question}
              animation
              onAnimationComplete={() => {
                if (STEP?.type === 'text') {
                  setFocus(STEP?.id as keyof Inputs);
                }

                setAnimationsCompleted({
                  ...animationsCompleted,
                  [STEP?.id]: true,
                });
              }}
            />

            {STEP?.options && animationsCompleted[STEP?.id] && (
              <Answer
                id={STEP?.id}
                type={STEP?.type}
                options={STEP?.options}
                value={inputs[STEP?.id]}
                animation
              />
            )}
          </div>
        </div>

        <footer className="sticky bottom-0 z-10 flex items-center justify-between px-6 py-4 space-x-5 bg-white border-t border-dark/10">
          {STEP?.type === 'text' && (
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
          )}
          {STEP?.type === 'textarea' && (
            <Controller
              key={STEP.id}
              name={STEP.id as keyof Inputs}
              control={control}
              rules={STEP.rules}
              defaultValue={STEP.defaultValue}
              render={({ field, fieldState }) => {
                return (
                  <TextArea
                    {...field}
                    rows={1}
                    className="w-full"
                    state={fieldState}
                    theme="minimal"
                    placeholder="Escribe aquí"
                  />
                );
              }}
            />
          )}

          {(STEP?.type === 'text' || STEP?.type === 'textarea') && (
            <Button
              type="submit"
              theme="primary"
              size="s"
              disabled={!formState.isValid}
            >
              Enviar
            </Button>
          )}

          {STEP?.type === 'radio' && (
            <div className="py-2 text-sm leading-tight text-dark">
              Selecciona una opción
            </div>
          )}

          {STEP?.type === 'submit' && (
            <div className="w-full space-y-2">
              <Button
                type="submit"
                theme="primary"
                size="base"
                className="w-full"
              >
                Enviar formulario
              </Button>

              <div
                className="text-xs text-center text-dark/40"
              >
                Al enviar el formulario aceptas la
                {' '}
                <a
                  className="text-dark"
                  href="/privacy-policy"
                >
                  política de privacidad
                </a>
              </div>
            </div>
          )}
        </footer>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
