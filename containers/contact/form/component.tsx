import {
  FC, useCallback, useEffect, useMemo, useState, RefObject, useRef,
} from 'react';

import {
  useForm, FormProvider, Controller, SubmitHandler,
} from 'react-hook-form';

import cx from 'classnames';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';

import Answer from './answer';
import {
  DEFAULT_STEPS,
  FUTURE_CLIENT_STEPS,
  FREELANCE_STEPS,
  COMPANY_STEPS,
} from './constants';
import Question from './question';

interface ContactFormProps {
  scrollRef: RefObject<HTMLDivElement>;
}

type Inputs = {
  name: string;
  email: string;
  who: string;
  // future-client
  description_client?: string;
  time?: string;
  budget?: string;
  // freelance
  description_freelance?: string;
  // company
  description_company?: string;
};

type Step = {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'submit';
  question: string;
  rules: any,
  defaultValue: string;
  inputProps: Record<string, any>;
  options?: {
    label: string;
    value: string;
  }[];
};

export const ContactForm: FC<ContactFormProps> = ({
  scrollRef,
}: ContactFormProps) => {
  const [step, setStep] = useState(0);
  const stepRef = useRef<string>('name');
  const [inputs, setInputs] = useState<Inputs>({
    name: 'Miguel',
    email: 'barrenechea.miguel@gmail.com',
    who: '',
    description_client: '',
    time: '',
    budget: '',
    description_freelance: '',
    description_company: '',
  });

  const [animating, setAnimating] = useState(false);
  const [animationsCompleted, setAnimationsCompleted] = useState({});

  const methods = useForm<Inputs>({
    mode: 'all',
    defaultValues: inputs,
  });
  const {
    control, watch, setFocus, handleSubmit, formState, trigger, resetField,
  } = methods;

  const watchAll = watch();
  const watchWho = watch('who');
  const watchTime = watch('time');
  const watchBudget = watch('budget');

  const STEPS = useMemo(() => {
    return [
      ...DEFAULT_STEPS,
      ...watchWho === 'future-client' ? FUTURE_CLIENT_STEPS : [],
      ...watchWho === 'freelance' ? FREELANCE_STEPS : [],
      ...watchWho === 'company' ? COMPANY_STEPS : [],
    ];
  }, [watchWho]);

  watch((data, { name }) => {
    stepRef.current = name;
  });

  const STEP = useMemo(() => STEPS[step] as Step, [step, STEPS]);

  const INPUT_KEYS = useMemo(() => {
    return STEPS.filter((s, i) => inputs[s.id] && i < step, []).map((s) => s.id);
  }, [step, STEPS, inputs]);

  const onSubmit: SubmitHandler<Inputs> = useCallback((data: Inputs) => {
    if (stepRef.current !== 'submit') {
      setInputs({
        ...inputs,
        ...data,
      });

      const nextStep = STEPS.findIndex((s) => s.id === stepRef.current) + 1;

      setStep(nextStep);
    } else {
      console.info('submit', {
        ...inputs,
        ...data,
      });
    }
  }, [inputs, STEPS]);

  useEffect(() => {
    if (watchWho) {
      const nextStep = STEPS.findIndex((s) => s.id === 'who') + 1;

      // Reset values
      STEPS
        .forEach((s, i) => {
          if (i >= nextStep) {
            resetField(s.id as keyof Inputs);
          }
        });

      // Reset animations completed
      const aCompleted = STEPS
        .reduce((acc, s, i) => {
          return {
            ...acc,
            [s.id]: i < nextStep,
          };
        }, {});

      setStep(nextStep);
      setAnimationsCompleted(aCompleted);
      handleSubmit(onSubmit)();
    }
  }, [watchWho]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      (watchTime && step <= STEPS.findIndex((s) => s.id === 'time'))
    ) {
      handleSubmit(onSubmit)();
    }
  }, [watchTime]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      (watchBudget && step <= STEPS.findIndex((s) => s.id === 'budget'))
    ) {
      handleSubmit(onSubmit)();
    }
  }, [watchBudget]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    disabled={animating}
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
              onAnimationStart={() => {
                setAnimating(true);
              }}
              onAnimationComplete={() => {
                if (STEP?.type === 'text' || STEP?.type === 'textarea') {
                  setTimeout(() => {
                    setFocus(STEP?.id as keyof Inputs);
                  }, 0);

                  trigger(STEP?.id as keyof Inputs);
                  stepRef.current = STEP?.id;
                }

                setAnimating(false);

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
                disabled={animating}
              />
            )}
          </div>
        </div>

        <footer className="sticky bottom-0 z-10 flex items-center justify-between px-6 py-4 space-x-5 bg-white border-t border-dark/10">
          {STEP?.type === 'text' && (
            <Controller
              key={STEP?.id}
              name={STEP?.id as keyof Inputs}
              control={control}
              rules={STEP?.rules}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    {...STEP?.inputProps}
                    className="w-full"
                    state={fieldState}
                    theme="minimal"
                    placeholder="Escribe aquí"
                    disabled={animating}
                  />
                );
              }}
            />
          )}
          {STEP?.type === 'textarea' && (
            <Controller
              key={STEP?.id}
              name={STEP?.id as keyof Inputs}
              control={control}
              rules={STEP?.rules}
              render={({ field, fieldState }) => {
                return (
                  <TextArea
                    {...field}
                    rows={1}
                    className="w-full"
                    state={fieldState}
                    theme="minimal"
                    placeholder="Escribe aquí"
                    disabled={animating}
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
            <div
              className={cx({
                'w-full space-y-2 transition-opacity': true,
                'opacity-0': !animationsCompleted[STEP?.id],
                'opacity-100': animationsCompleted[STEP?.id],
              })}
            >
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
