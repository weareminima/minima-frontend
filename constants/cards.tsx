export const CARD_SIZE = {
  width: 164,
  height: 164,
};

const angle = 45;

export const CARD_TRANSFORMS = {
  studio: {
    rotation: 30,
    angle: 360 - angle,
  },
  principles: {
    rotation: 0,
    angle: 0,
  },
  services: {
    rotation: -15,
    angle: 0 + angle,
  },
  method: {
    rotation: 15,
    angle: 180 - angle,
  },
  lab: {
    rotation: -15,
    angle: 180,
  },
  contact: {
    rotation: 15,
    angle: 180 + angle,
  },
};

export const CARDS = [
  {
    index: 1,
    id: 'studio',
    title: 'Estudio',
    subtitle: (
      <p className="text-base leading-tight ">
        Diseñamos
        {' '}
        <i className="block text-lg font-italic font-display">lo que importa</i>
      </p>
    ),
    description: 'Somos un estudio de diseño de marcas, productos y servicios para proyectos con integridad de propósito.',
    className: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-500/0',
  },
  {
    index: 2,
    id: 'principles',
    title: 'Principios',
    subtitle: (
      <p className="text-base leading-tight ">
        Somos lo
        {' '}
        <i className="block text-lg font-italic font-display">que hacemos</i>
      </p>
    ),
    description: 'Las historias que diseñamos se resumen en los principios que las guían.',
    className: 'bg-coral-500',
    gradient: 'from-coral-500 to-coral-500/0',
  },
  {
    index: 3,
    id: 'services',
    title: 'Servicios',
    subtitle: (
      <p className="text-base leading-tight ">
        Si podemos pensarlo,
        {' '}
        <i className="block text-lg font-italic font-display">podemos diseñarlo</i>
      </p>
    ),
    description: 'Creamos soluciones en la intersección entre negocio y propósito para quienes sirven a un mundo mejor.',
    className: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-500/0',
  },
  {
    index: 4,
    id: 'method',
    title: 'Método',
    subtitle: (
      <p className="text-base leading-tight ">
        Pensando el fondo para
        {' '}
        <i className="block text-lg font-italic font-display">diseñar la forma</i>
      </p>
    ),
    description: 'Empleamos diferentes metodologías para advertir en lo ordinario, lo extraordinario.',
    className: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-500/0',
  },
  {
    index: 5,
    id: 'lab',
    title: 'Lab',
    subtitle: (
      <p className="text-base leading-tight ">
        Formas de mirar que inspiran
        {' '}
        <i className="block text-lg font-italic font-display">formas de hacer</i>
      </p>
    ),
    description: 'Ponemos a prueba ideas y perspectivas para avanzar en la exploración creativa.',
    className: 'bg-green-500',
    gradient: 'from-green-500 to-green-500/0',
  },
  {
    index: 6,
    id: 'contact',
    title: 'Contacto',
    subtitle: (
      <p className="text-base leading-tight ">
        Diseñemos
        {' '}
        <i className="block text-lg font-italic font-display">juntos lo posible</i>
      </p>
    ),
    description: 'Si quieres contarnos tu idea, colaborar con nosotras o conversar sobre lo que podríamos hacer juntos, escríbenos.',
    className: 'bg-gray-100',
    gradient: 'from-gray-100 to-gray-100/0',
  },
];
