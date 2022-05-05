import {
  FC, useCallback, useEffect, useMemo, useState, RefObject, useRef,
} from 'react';

import {
  useForm, FormProvider, Controller, SubmitHandler,
} from 'react-hook-form';

import cx from 'classnames';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';
import Icon from 'components/icon';
import Loading from 'components/loading';

import INSTAGRAM_SVG from 'svgs/instagram.svg?sprite';
import LINKEDIN_SVG from 'svgs/linkedin.svg?sprite';
import THANK_YOU_SVG from 'svgs/thank-you.svg?sprite';
import TWITTER_SVG from 'svgs/twitter.svg?sprite';

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

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
      console.info('submit', {
        ...inputs,
        ...data,
      });

      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 2000);
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
      <AnimatePresence
        initial={false}
      >
        {!submitted && (
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
                    }

                    stepRef.current = STEP?.id;

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
                    'relative w-full space-y-2 transition-opacity': true,
                    'opacity-0': !animationsCompleted[STEP?.id],
                    'opacity-100': animationsCompleted[STEP?.id],
                  })}
                >
                  <Loading
                    visible={submitting}
                    className="absolute z-10 flex items-center justify-center w-full h-full bg-white/75"
                    iconClassName="w-10 h-10"
                  />

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
        )}

        {submitted && (
          <motion.div
            key="submitted-content"
            className="relative z-0 flex flex-col items-center justify-center space-y-8 grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-10 space-y-4 text-center">
              <div className="mx-auto">
                <Icon icon={THANK_YOU_SVG} className="w-16 h-16 mx-auto" />
              </div>
              <div>
                <h2 className="text-base text-dark">
                  Genial,
                  {' '}
                  {inputs.name}
                </h2>
                <p className="text-sm text-dark/40">
                  Puedes seguirnos para bla bla lorem ipsum
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                theme="primary-alt"
                size="icon"
              >
                <Icon icon={LINKEDIN_SVG} className="w-4 h-4 stroke-none fill-none" />
              </Button>
              <Button
                type="button"
                theme="primary-alt"
                size="icon"
              >
                <Icon icon={TWITTER_SVG} className="w-4 h-4 stroke-none fill-none" />
              </Button>
              <Button
                type="button"
                theme="primary-alt"
                size="icon"
              >
                <Icon icon={INSTAGRAM_SVG} className="w-4 h-4 stroke-none fill-none" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default ContactForm;
