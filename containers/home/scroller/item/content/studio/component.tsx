import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import Img from 'containers/home/scroller/item/content/common/img';
import ImgTxt from 'containers/home/scroller/item/content/common/img-txt';
import Txt3Columns from 'containers/home/scroller/item/content/common/txt-3-columns';

import Tag from 'components/tag';

interface ContentItemStudioProps { }

export const ContentItemStudio: FC<ContentItemStudioProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'studio', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <ImgTxt
        image={{
          src: '/images/studio/01.png',
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
              Quiénes somos
            </Tag>
          </div>

          <div className="space-y-4">
            <p>Mínima nace a finales de 2021 como respuesta a una obsesión que fue gestándose a lo largo de más de una década de trabajo.</p>
            <p>Después de desarrollar la profesión en una multitud de ambientes y compañías, descubrimos que lo que nos movía cada día, la constante siempre presente, era una búsqueda incansable por conquistar el buen diseño, honesto en forma y fondo.</p>
          </div>
        </>
      </ImgTxt>
      <Txt3Columns>
        <div id="column1">
          <h3 className="text-5xl lg:text-6xl font-display">
            Pero, ¿qué significa hacer
            {' '}
            <i className="italic">buen diseño?</i>
          </h3>
        </div>
        <div id="column2">
          <p>
            En Mínima entendemos el diseño como la herramienta más propia del ser humano, capaz de modelar la realidad en todas y cada una de sus dimensiones. Pero el diseño no solo es el resultado, es también la intención que lo impulsa y el impacto que genera. Esto conlleva una responsabilidad de la que nos vemos alejados por estar entretenidos con temáticas de segundo orden. Por esta razón, tendemos a olvidar que el diseño es tan funcional y estético como social, político o ecológico.
          </p>
        </div>
        <div id="column3" className="space-y-2.5">
          <p className="text-3xl italic font-display">
            Es por esto que reivindicamos recuperar su verdadero sentido: intervenir de forma consciente, comprometida y responsable no solo en un presente más sano, sino en un futuro más próspero.
          </p>
          <p>
            Nace así Mínima como voluntad para reflexionar, hacer y fomentar el bien común a través de un enfoque centrado no solo en diseñar correctamente sino en diseñar lo correcto, ya que creemos firmemente que un buen diseño comienza con un gran propósito.
          </p>
        </div>
      </Txt3Columns>

      <div className="py-20 border-t border-dashed border-dark/25">
        <Img
          image={{
            src: {
              xs: '/images/studio/02-xs.png',
              sm: '/images/studio/02.png',
            },
            alt: 'Hero',
            width: 2624,
            height: 1056,
          }}
        />

        <Txt3Columns>
          <div id="column1">
            <div className="mb-8">
              <Tag>
                Por qué Mínima
              </Tag>
            </div>

            <h3 className="text-5xl lg:text-6xl font-display">
              Comprometidas con el verdadero
              {' '}
              <i className="italic">cuidado de lo esencial</i>
            </h3>
          </div>
          <div id="column2">
            <p>
              El nombre surgió de forma espontánea en mitad de una de las muchas y largas conversaciones en las que nos sumergíamos casi a diario. Buscábamos contribuir a un mundo mejor generando no solo beneficios económicos, sino también sociales y ambientales, pero, ¿por dónde empezar? Sabíamos que sin las personas adecuadas nada de esto sería posible, así que lo primero que necesitábamos era conocer cómo crear el equipo perfecto. Para ello debíamos evitar las grandes estructuras fijas donde las ideas se paralizan, los avances se ven constantemente entorpecidos y el resultado final es un conjunto de piezas desarticuladas e inconexas que poco o nada tienen que ver con el objetivo inicial.
            </p>
          </div>
          <div id="column3" className="space-y-2.5">
            <p>
              Inmediatamente nos preguntamos, ¿cuál sería la estructura mínima indispensable? Y justo ahí, en mitad de la pregunta, se encontraba contenida la respuesta. El equipo central sería el justo y necesario para mantener la estabilidad, adquirir entidad propia y permitir la diversidad de proyectos gracias a una red de colaboradores con los que compartiríamos principios, prioridades y nivel de exigencia. El resultado sería la creación y consolidación de relaciones sólidas con perfiles provenientes de múltiples mundos para ampliar la perspectiva, conectar ideas y avanzar progresivamente en nuestra misión.
            </p>
          </div>
        </Txt3Columns>
      </div>
    </>
  );
};

export default ContentItemStudio;
