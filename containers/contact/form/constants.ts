/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

export const DEFAULT_STEPS = [
  {
    id: 'name',
    question: '¡Hola! ¿cómo te llamas?',
    defaultValue: '',
    type: 'text',
    inputProps: {
      type: 'text',
    },
    rules: {
      required: true,
    },
  },
  {
    id: 'email',
    question: '¿Cuál es tu email?',
    defaultValue: '',
    type: 'text',
    inputProps: {
      type: 'email',
    },
    rules: {
      required: true,
      email: true,
    },
  },
  {
    id: 'who',
    question: 'Eres...',
    defaultValue: '',
    rules: {
      required: true,
    },
    type: 'radio',
    options: [
      {
        value: 'future-client',
        label: 'Futuro cliente',
      },
      {
        value: 'freelance',
        label: 'Freelance',
      },
      {
        value: 'company',
        label: 'Empresa',
      },
    ],
  },
];

export const FUTURE_CLIENT_STEPS = [
  {
    id: 'description_client',
    question: 'Cuéntanos tu idea, la extensión de un tuit está bien ;)',
    defaultValue: '',
    type: 'textarea',
    inputProps: {
      rows: 1,
    },
    rules: {
      required: true,
    },
  },
  {
    id: 'time_client',
    question: '¿Cuánto tiempo tenemos?',
    defaultValue: '',
    rules: {
      required: true,
    },
    type: 'radio',
    options: [
      {
        value: '1',
        label: '1 mes',
      },
      {
        value: '2-3',
        label: '2-3 meses',
      },
      {
        value: '3-6',
        label: '3-6 meses',
      },
      {
        value: '+6',
        label: '+6 meses',
      },
    ],
  },
  {
    id: 'budget_client',
    question: '¿Cuál es tu presupuesto?',
    defaultValue: '',
    rules: {
      required: true,
    },
    type: 'radio',
    options: [
      {
        value: '<10k',
        label: '< 10k',
      },
      {
        value: '10k-30k',
        label: '10k - 30k',
      },
      {
        value: '30k-60k',
        label: '30k - 60k',
      },
      {
        value: '>60k',
        label: '> 60k',
      },
    ],
  },
  {
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

export const FREELANCE_STEPS = [
  {
    id: 'description_freelance',
    question: '¿Cómo quieres colaborar con nosotros?',
    defaultValue: '',
    type: 'textarea',
    inputProps: {
      rows: 1,
    },
    rules: {
      required: true,
    },
  },
  {
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

export const COMPANY_STEPS = [
  {
    id: 'description_company',
    question: '¿Cómo quieres colaborar con nosotros?',
    defaultValue: '',
    type: 'textarea',
    inputProps: {
      rows: 1,
    },
    rules: {
      required: true,
    },
  },
  {
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

export const useSchema = (inputs) => {
  const {
    name,
    email,
    who,
    description_client,
    time_client,
  } = inputs;

  console.log(inputs);

  const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    ...name && {
      email: yup.string().email().required(),
    },
    ...name && email && {
      who: yup.string().required(),
    },
    ...name && email && who && {
      // future-client
      description_client: yup.string().when('who', {
        is: 'future-client',
        then: yup.string().min(10).required(),
      }),
    },
    ...name && email && who && description_client && {
      time_client: yup.string().when('who', {
        is: 'future-client',
        then: yup.string().required(),
      }),
    },
    ...name && email && who && description_client && time_client && {
      budget_client: yup.string().when('who', {
        is: 'future-client',
        then: yup.string().required(),
      }),
    },
    // freelance
    ...name && email && who && {
      description_freelance: yup.string().when('who', {
        is: 'freelance',
        then: yup.string().min(10).required(),
      }),
    },
    // company
    ...name && email && who && {
      description_company: yup.string().when('who', {
        is: 'company',
        then: yup.string().min(10).required(),
      }),
    },
  });

  return schema;
};
