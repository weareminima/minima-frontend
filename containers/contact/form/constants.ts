export const STEPS = [
  {
    id: 'name',
    question: '¡Hola! ¿cómo te llamas?',
    defaultValue: '',
    rules: {
      required: true,
    },
  },
  {
    id: 'email',
    question: '¿Cuál es tu email?',
    defaultValue: '',
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
  },
];
