/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

export const DEFAULT_STEPS = [
  {
    id: 'name',
    question: '¡Hola, somos Mínima! 👋. ¡Qué bien que estés aquí! 😍, dinos ¿cómo te llamas?',
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
    id: 'who',
    question: 'Encantadas de saludarte, ¿cómo podríamos ayudarte?',
    defaultValue: '',
    rules: {
      required: true,
    },
    type: 'radio',
    options: [
      {
        value: 'future-client',
        label: 'Tengo una idea o proyecto',
      },
      {
        value: 'freelance',
        label: 'Quiero colaborar como freelance',
      },
      {
        value: 'company',
        label: 'Quiero colaborar como empresa',
      },
    ],
  },
];

export const FUTURE_CLIENT_STEPS = [
  {
    id: 'description_client',
    question: '¿De qué se trata? La extensión de un tuit será suficiente 🐥',
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
    question: '¡Suena genial!, 🤗 ¿cuánto tiempo tendríamos para ponerlo en marcha?',
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
    question: 'Y ¿cuál sería el presupuesto para hacerlo realidad? 💪',
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
    id: 'email',
    question: '¡Genial! Déjanos tu email y te escribiremos lo antes posible 😉',
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
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

export const FREELANCE_STEPS = [
  {
    id: 'description_freelance',
    question: '¡Qué bien! siempre nos hace mucha ilusión conocer a gente nueva con la que colaborar 🤜🏾 🤛🏼 Y ¿en qué te has especializado?',
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
    id: 'url_freelance',
    question: 'Nos encantaría ver algo de tu trabajo. Si te parece, déjanos algún enlace a tu web, Behance, Dribbble o a donde lo tengas subido 💾',
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
    question: '¡Genial! Déjanos tu email y te escribiremos lo antes posible 😉',
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
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

export const COMPANY_STEPS = [
  {
    id: 'who_company',
    question: '¡Qué bien! siempre nos hace mucha ilusión conocer equipos nuevos con los que empezar a colaborar 🤜🏾 🤛🏼 Y dinos, ¿qué empresa es?',
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
    id: 'description_company',
    question: '¿En qué áreas estáis especializados?',
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
    id: 'email',
    question: '¡Genial! Déjanos tu email y te escribiremos lo antes posible 😉',
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
    id: 'submit',
    question: '¡Estupendo!',
    type: 'submit',
  },
];

const SCHEMA = {
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  who: yup.string().required(),
  description_client: yup.string().when('who', {
    is: 'future-client',
    then: yup.string().min(10).required(),
  }),
  // future-client
  time_client: yup.string().when('who', {
    is: 'future-client',
    then: yup.string().required(),
  }),

  budget_client: yup.string().when('who', {
    is: 'future-client',
    then: yup.string().required(),
  }),
  // freelance
  description_freelance: yup.string().when('who', {
    is: 'freelance',
    then: yup.string().min(10).required(),
  }),
  url_freelance: yup.string().when('who', {
    is: 'freelance',
    then: yup.string().required(),
  }),
  // company
  who_company: yup.string().when('who', {
    is: 'company',
    then: yup.string().required(),
  }),
  description_company: yup.string().when('who', {
    is: 'company',
    then: yup.string().min(10).required(),
  }),
};

export const useSchema = (inputs, editableStep) => {
  const {
    name,
    who,
    // CLIENT
    description_client,
    time_client,
    budget_client,

    // FREELANCE
    description_freelance,
    url_freelance,
    // COMPANY
    who_company,
    description_company,
  } = inputs;

  if (editableStep) {
    return yup.object().shape({
      [editableStep]: SCHEMA[editableStep],
    });
  }

  const schema = yup.object().shape({
    name: SCHEMA.name,
    ...name && {
      who: SCHEMA.who,
    },
    ...name && who && {
      // future-client
      description_client: yup.string().when('who', {
        is: 'future-client',
        then: SCHEMA.description_client,
      }),
    },
    ...name && who && description_client && {
      time_client: yup.string().when('who', {
        is: 'future-client',
        then: SCHEMA.time_client,
      }),
    },
    ...name && who && description_client && time_client && {
      budget_client: yup.string().when('who', {
        is: 'future-client',
        then: SCHEMA.budget_client,
      }),
    },
    ...name && who && description_client && time_client && budget_client && {
      email: yup.string().when('who', {
        is: 'future-client',
        then: SCHEMA.email,
      }),
    },

    // freelance
    ...name && who && {
      description_freelance: yup.string().when('who', {
        is: 'freelance',
        then: SCHEMA.description_freelance,
      }),
    },
    ...name && who && description_freelance && {
      url_freelance: yup.string().when('who', {
        is: 'freelance',
        then: SCHEMA.url_freelance,
      }),
    },
    ...name && who && description_freelance && url_freelance && {
      email: yup.string().when('who', {
        is: 'freelance',
        then: SCHEMA.email,
      }),
    },
    // company
    ...name && who && {
      who_company: yup.string().when('who', {
        is: 'company',
        then: SCHEMA.who_company,
      }),
    },
    ...name && who && who_company && {
      description_company: yup.string().when('who', {
        is: 'company',
        then: SCHEMA.description_company,
      }),
    },
    ...name && who && who_company && description_company && {
      email: yup.string().when('who', {
        is: 'company',
        then: SCHEMA.email,
      }),
    },
  });

  return schema;
};
