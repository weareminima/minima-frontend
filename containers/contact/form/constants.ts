export const STEPS = [
  {
    id: 'name',
    question: '¡Hola! ¿cómo te llamas?',
    defaultValue: '',
    type: 'text',
    rules: {
      required: true,
    },
  },
  {
    id: 'email',
    question: '¿Cuál es tu email?',
    defaultValue: '',
    type: 'text',
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
  {
    id: 'message',
    question: 'Cuéntanos tu idea, la extensión de un tuit está bien ;)',
    defaultValue: '',
    type: 'text',
    rules: {
      required: true,
    },
  },
];
