import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import ImgTxt from 'containers/home/scroller/item/content/common/img-txt';

import Tag from 'components/tag';

interface ContentItemServicesProps {}

export const ContentItemServices: FC<ContentItemServicesProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'services', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <div className="divide-y divide-dark/25 divide-dashed">
        <ImgTxt
          image={{
            src: '/images/services/01.png',
            alt: 'Hero',
            width: 1728,
            height: 1728,
          }}
          options={{
            fullScreen: true,
            reverse: true,
            imageClassName: 'w-full lg:w-8/12',
            contentClassName: 'w-full lg:w-4/12',
          }}
        >
          <>
            <div className="mb-8">
              <Tag>
                Qué hacemos
              </Tag>
            </div>

            <div className="space-y-4">
              <p>Nuestro objetivo es aportar diseños no solo rentables, sino también conectados con algo más grande, noble y trascendente: mejorar el presente y promover la calidad del futuro a través de la dirección estratégica, conceptualización y creación de marcas, productos y servicios.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/services/02.png',
            alt: 'Hero',
            width: 832,
            height: 832,
            caption: (
              <div className="text-2xl font-display">
                Estrategia de marca, posicionamiento, naming, identidad visual, tono y voz, ilustración, iconografía, packaging, editorial, 3D...
              </div>
            ),
          }}
        >
          <>
            <h3 className="mb-4 text-5xl lg:text-6xl font-display">
              Marcas
            </h3>

            <div className="space-y-4">
              <p className="text-3xl italic font-display">¿Qué debería representar la marca para el mundo?, ¿cómo influirá en la configuración de nuevas formas y estilos de vida?, y lo más importante, ¿cómo moldeará la forma de percibir, entender y valorar nuestra realidad?</p>
              <p>Las respuestas a estas preguntas determinarán su caracterización, discurso y esferas de actuación. Nuestro trabajo consiste en detectar qué hace a la marca única y extraordinaria para revelar su esencia, contar su historia y hacer que habite de manera singular en nosotros y en el mundo.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/services/03.png',
            alt: 'Hero',
            width: 832,
            height: 832,
            caption: (
              <div className="text-2xl font-display">
                Estrategia y auditoría de producto, SaaS, eCommerce, webs corporativas, apps híbridas y nativas, herramientas digitales, sistemas de diseño, etc.
              </div>
            ),
          }}
          options={{
            reverse: true,
          }}
        >
          <>
            <h3 className="mb-4 text-5xl lg:text-6xl font-display">
              Productos
            </h3>

            <div className="space-y-4">
              <p className="text-3xl italic font-display">¿Qué debería significar el producto para su usuario?, ¿en qué medida generará autonomía o dependencias?, y lo más relevante, ¿cómo modificará su vida, la de su entorno y las relaciones entre ellos?</p>
              <p>En Mínima buscamos responder a estas y otras preguntas para diseñar y crear productos más humanos que sean verdaderamente significativos, útiles, éticos y estéticos. Nos encargamos de traducir conceptos en productos accesibles, emocionales y sostenibles para eliminar barreras sociales, lanzar alternativas responsables y fomentar el bienestar global.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/services/04.png',
            alt: 'Hero',
            width: 832,
            height: 832,
            caption: (
              <div className="text-2xl font-display">
                Service blueprint, auditoría de servicio, prototipo piloto, user research, workshops, estudios cualitativos, etc.
              </div>
            ),
          }}
        >
          <>
            <h3 className="mb-4 text-5xl lg:text-6xl font-display">
              Servicios
            </h3>

            <div className="space-y-4">
              <p className="text-3xl italic font-display">¿Qué servicios urge diseñar o redefinir para los diferentes colectivos sociales?, ¿de qué forma y en qué medida mejorará la empresa, la vida y el mundo en el que estos tienen lugar?</p>
              <p>En Mínima nos enfocamos en conceptualizar la forma en que las compañías pueden ofrecer sus intangibles centrando esfuerzos en diseñar meticulosamente la experiencia. Lo llevamos a cabo definiendo y vinculando diferentes sistemas de interacciones humanas, físicas y digitales, para crear momentos donde la organización y el mundo se encuentran. Trabajamos en la cara invisible para hacer visible la atención, asistencia y cuidado en cada punto de la experiencia.</p>
            </div>
          </>
        </ImgTxt>
      </div>

    </>
  );
};

export default ContentItemServices;
