import {
  FC, useCallback, useEffect, useMemo, useState, RefObject, useRef,
} from 'react';

import {
  useForm, FormProvider, Controller, SubmitHandler,
} from 'react-hook-form';

import cx from 'classnames';

import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from 'framer-motion';

import { useSaveContact } from 'hooks/contact';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CONTACT_ISOTYPE_2_SVG from 'svgs/contact-isotype-2.svg?sprite';
import INSTAGRAM_SVG from 'svgs/instagram.svg?sprite';
import LINKEDIN_SVG from 'svgs/linkedin.svg?sprite';
// import TWITTER_SVG from 'svgs/twitter.svg?sprite';

import Answer from './answer';
import {
  DEFAULT_STEPS,
  FUTURE_CLIENT_STEPS,
  FREELANCE_STEPS,
  COMPANY_STEPS,
  useSchema,
} from './constants';
import Question from './question';

interface ContactFormProps {
  scrollRef: RefObject<HTMLDivElement>;
}

type Inputs = {
  name?: string;
  email?: string;
  who?: string;
  // future-client
  description_client?: string;
  time_client?: string;
  budget_client?: string;
  // freelance
  description_freelance?: string;
  url_freelance?: string;
  // company
  who_company?: string;
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
  const [editableStep, setEditableStep] = useState<string>();
  const stepRef = useRef<string>('name');
  const inputsRef = useRef<Inputs>({} as Inputs);

  const contactMutation = useSaveContact();

  const [inputs, setInputs] = useState<Inputs>({
    name: undefined,
    email: undefined,
    who: undefined,

    description_client: undefined,
    time_client: undefined,
    budget_client: undefined,

    description_freelance: undefined,
    url_freelance: undefined,

    who_company: undefined,
    description_company: undefined,
  });

  const SCHEMA = useSchema(inputs, editableStep);

  const [animating, setAnimating] = useState(false);
  const [animationsCompleted, setAnimationsCompleted] = useState({});

  const [submitted, setSubmitted] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<Inputs>({
    mode: 'all',
    defaultValues: inputs,
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      // console.log('formData', data);
      // console.log('validation result', await yupResolver(SCHEMA)(data, context, options));
      return yupResolver(SCHEMA)(data, context, options);
    },
  });
  const {
    control, watch, setFocus, handleSubmit, formState, trigger, resetField,
  } = methods;

  const watchAll = watch();
  const watchWho = watch('who');
  const watchTime = watch('time_client');
  const watchBudget = watch('budget_client');

  const STEPS = useMemo(() => {
    return [
      ...DEFAULT_STEPS,
      ...watchWho === 'future-client' ? FUTURE_CLIENT_STEPS : [],
      ...watchWho === 'freelance' ? FREELANCE_STEPS : [],
      ...watchWho === 'company' ? COMPANY_STEPS : [],
    ];
  }, [watchWho]);

  const STEP = useMemo(() => STEPS[step] as Step, [step, STEPS]);
  const EDITABLE_STEP = useMemo(() => {
    if (typeof editableStep !== 'undefined' && editableStep !== null) {
      return STEPS.find((s) => s.id === editableStep) as Step;
    }
    return STEP as Step;
  }, [editableStep, STEP, STEPS]);

  const INPUT_KEYS = useMemo(() => {
    return STEPS.filter((s, i) => inputs[s.id] && i < step, []).map((s) => s.id);
  }, [step, STEPS, inputs]);

  const onSubmit: SubmitHandler<Inputs> = useCallback((data: Inputs) => {
    if (!editableStep) {
      if (stepRef.current !== 'submit') {
        setInputs({
          ...inputs,
          ...data,
        });

        const nextStep = STEPS.findIndex((s) => s.id === stepRef.current) + 1;

        setStep(nextStep);
      } else {
        setSubmitting(true);
        contactMutation.mutate({
          data,
        }, {
          onSuccess: () => {
            setSubmitting(false);
            setSubmitted(true);
          },
          onError: () => {
            setSubmitting(false);
          },
        });
      }
    }

    if (editableStep) {
      setEditableStep(undefined);
      setInputs({
        ...inputs,
        [editableStep]: data[editableStep],
      });
      stepRef.current = STEP?.id;
      setTimeout(() => {
        if (STEP?.id && (STEP?.type === 'text' || STEP?.type === 'textarea')) {
          setFocus(STEP?.id as keyof Inputs);
        }
        trigger();
      }, 0);
    }
  }, [inputs, STEP, STEPS, editableStep, setFocus, trigger, contactMutation]);

  useEffect(() => {
    if (editableStep) {
      setTimeout(() => {
        setFocus(EDITABLE_STEP?.id as keyof Inputs);
      }, 0);
    }
  }, [editableStep, EDITABLE_STEP, setFocus]);

  useEffect(() => {
    const subcription = watch((data, { name }) => {
      inputsRef.current = data;
      if (!editableStep) stepRef.current = name;
    });

    return () => {
      subcription.unsubscribe();
    };
  }, [watch, editableStep]);

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
      setInputs(inputsRef.current);
      handleSubmit(onSubmit)();
    }
  }, [watchWho]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      (watchTime && step <= STEPS.findIndex((s) => s.id === 'time_client'))
    ) {
      handleSubmit(onSubmit)();
    }
  }, [watchTime]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      (watchBudget && step <= STEPS.findIndex((s) => s.id === 'budget_client'))
    ) {
      handleSubmit(onSubmit)();
    }
  }, [watchBudget]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!editableStep) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);
    }
  }, [scrollRef, animationsCompleted, watchAll, editableStep]);

  return (
    <FormProvider
      {...methods}
    >
      <AnimatePresence
        initial={false}
      >
        {!submitted && (
          <form
            className="relative z-0 flex flex-col justify-between grow"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="px-6 py-4 text-sm text-center border-b text-dark/60 border-dark/10">
              <p className="max-w-[300px] mx-auto">
                Si quieres comentar cualquier otro tema escríbenos a
                {' '}
                <a
                  href="mailto:hello@weareminima.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  hello@weareminima.com
                </a>
              </p>
            </div>
            <div>
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
                          onEdit={() => {
                            setEditableStep(OLD_STEP?.id);
                          }}
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
                {EDITABLE_STEP?.type === 'text' && (
                  <Controller
                    key={EDITABLE_STEP?.id}
                    name={EDITABLE_STEP?.id as keyof Inputs}
                    control={control}
                    rules={EDITABLE_STEP?.rules}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          {...EDITABLE_STEP?.inputProps}
                          className="w-full placeholder:text-dark/40"
                          state={fieldState}
                          theme="minimal"
                          placeholder="Escribe aquí"
                          disabled={animating}
                        />
                      );
                    }}
                  />
                )}
                {EDITABLE_STEP?.type === 'textarea' && (
                  <Controller
                    key={EDITABLE_STEP?.id}
                    name={EDITABLE_STEP?.id as keyof Inputs}
                    control={control}
                    rules={EDITABLE_STEP?.rules}
                    render={({ field, fieldState }) => {
                      return (
                        <TextArea
                          {...field}
                          rows={1}
                          className="w-full placeholder:text-dark/40"
                          state={fieldState}
                          theme="minimal"
                          placeholder="Escribe aquí"
                          disabled={animating}
                        />
                      );
                    }}
                  />
                )}

                {(EDITABLE_STEP?.type === 'text' || EDITABLE_STEP?.type === 'textarea') && (
                  <Button
                    type="submit"
                    theme="primary"
                    size="s"
                    disabled={!formState.isValid}
                  >
                    Enviar
                  </Button>
                )}

                {EDITABLE_STEP?.type === 'radio' && (
                  <div className="py-2 text-sm leading-tight text-dark/40">
                    Selecciona una opción
                  </div>
                )}

                {EDITABLE_STEP?.type === 'submit' && (
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
            </div>
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
                <Icon icon={CONTACT_ISOTYPE_2_SVG} className="w-8 h-8 mx-auto" />
              </div>
              <div className="max-w-[264px] mx-auto">
                <h2 className="text-base text-dark">
                  ¡Hablamos pronto!
                </h2>
                <p className="text-sm text-dark/40">
                  Mientras, puedes seguirnos en nuestras redes sociales para no perderte nada.
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                theme="primary-alt"
                size="icon-base"
                href="https://es.linkedin.com/company/weareminima"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={LINKEDIN_SVG} className="w-4 h-4" style={{ stroke: 'none' }} />
              </Button>
              {/* <Button
                type="button"
                theme="primary-alt"
                size="icon-base"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={TWITTER_SVG} className="w-4 h-4" style={{ stroke: 'none' }} />
              </Button> */}
              <Button
                type="button"
                theme="primary-alt"
                size="icon-base"
                href="https://www.instagram.com/weareminima/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={INSTAGRAM_SVG} className="w-4 h-4" style={{ stroke: 'none' }} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default ContactForm;
