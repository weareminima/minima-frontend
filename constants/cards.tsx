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
      <p className="font-size-[16px] leading-5">
        Diseñamos
        {' '}
        <i className="block text-lg font-italic font-display">lo que importa</i>
      </p>
    ),
    description: (
      <div>
        Somos un estudio de diseño de marcas, productos y servicios para proyectos con
        {' '}
        <span className="italic">integridad de propósito.</span>
      </div>
    ),
    className: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-500/0',
  },
  {
    index: 2,
    id: 'principles',
    title: 'Principios',
    subtitle: (
      <p className="font-size-[16px] leading-5">
        Somos lo
        {' '}
        <i className="block text-lg font-italic font-display">que hacemos</i>
      </p>
    ),
    description: (
      <div>
        Desafiamos los modelos del mundo actual para generar un
        {' '}
        <span className="italic">cambio positivo.</span>
      </div>
    ),
    className: 'bg-coral-500',
    gradient: 'from-coral-500 to-coral-500/0',
  },
  {
    index: 3,
    id: 'services',
    title: 'Servicios',
    subtitle: (
      <p className="font-size-[16px] leading-5">
        Si podemos pensarlo,
        {' '}
        <i className="block text-lg font-italic font-display">podemos diseñarlo</i>
      </p>
    ),
    description: (
      <div>
        Creamos soluciones en la intersección entre negocio y propósito para
        {' '}
        <span className="italic">quienes sirven a un mundo mejor.</span>
      </div>
    ),
    className: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-500/0',
  },
  {
    index: 4,
    id: 'method',
    title: 'Método',
    subtitle: (
      <p className="font-size-[16px] leading-5">
        Pensando el fondo para
        {' '}
        <i className="block text-lg font-italic font-display">diseñar la forma</i>
      </p>
    ),
    description: (
      <div>
        Conectamos metodologías para advertir en lo ordinario,
        {' '}
        <span className="italic">lo extraordinario.</span>
      </div>
    ),
    className: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-500/0',
  },
  {
    index: 5,
    id: 'lab',
    title: 'Lab',
    subtitle: (
      <p className="font-size-[16px] leading-5">
        Formas de mirar que inspiran
        {' '}
        <i className="block text-lg font-italic font-display">formas de hacer</i>
      </p>
    ),
    description: (
      <div>
        Ponemos a prueba ideas y perspectivas para avanzar en la
        {' '}
        <span className="italic">exploración creativa.</span>
      </div>
    ),
    className: 'bg-green-500',
    gradient: 'from-green-500 to-green-500/0',
  },
  {
    index: 6,
    id: 'contact',
    title: 'Contacto',
    subtitle: (
      <p className="font-size-[16px] leading-5">
        Diseñemos
        {' '}
        <i className="block text-lg font-italic font-display">posibilidades juntos</i>
      </p>
    ),
    description: (
      <div>
        Si quieres contarnos tu idea, colaborar con nosotras o conversar sobre lo que podríamos hacer juntos,
        {' '}
        <span className="italic">escríbenos.</span>
      </div>
    ),
    className: 'bg-gray-100',
    gradient: 'from-gray-100 to-gray-100/0',
  },
];
