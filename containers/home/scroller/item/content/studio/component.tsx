import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import Img from 'containers/home/scroller/item/content/common/img';
import Txt3Columns from 'containers/home/scroller/item/content/common/txt-3-columns';

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

      <Img
        image={{
          src: '/images/studio/full-screen.png',
          alt: 'Hero',
        }}
      />

      <Txt3Columns>
        <div id="column1">
          <h3 className="text-6xl font-display">
            Pero, ¿qué significa hacer buen diseño?
          </h3>
        </div>
        <div id="column2">
          <p>
            En Mínima entendemos el diseño como la herramienta más propia del ser humano, capaz de modelar la realidad en todas sus dimensiones. Pero el diseño no solo es el resultado, es también la intención que lo impulsa y el impacto que genera. Esto conlleva una responsabilidad de la que nos vemos alejados por estar entretenidos con temáticas de segundo orden. Por esta razón, tendemos a olvidar que el diseño es tan funcional y estético como social, político o ecológico.
          </p>
        </div>
        <div id="column3" className="space-y-2.5">
          <p className="text-2xl italic font-display">
            Es por esto que reivindicamos recuperar su verdadero sentido: intervenir de forma consciente, comprometida y responsable no solo en un presente más sano sino en un futuro más próspero.
          </p>
          <p>
            Nace así Mínima como voluntad para reflexionar, hacer y participar en el bienestar de los individuos, la sociedad y el entorno, porque sabemos que un buen diseño comienza con un gran propósito.
          </p>
        </div>
      </Txt3Columns>
    </>
  );
};

export default ContentItemStudio;
