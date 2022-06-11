import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import ImgTxt from 'containers/home/scroller/item/content/common/img-txt';

import Tag from 'components/tag';

interface ContentItemPrinciplesProps {}

export const ContentItemPrinciples: FC<ContentItemPrinciplesProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'principles', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <div className="divide-y divide-dark/25 divide-dashed">
        <ImgTxt
          image={{
            src: '/images/principles/01.png',
            alt: 'Hero',
          }}
        >
          <>
            <div className="mb-8">
              <Tag>
                Principio nº1
              </Tag>
            </div>

            <h3 className="mb-4 text-6xl font-display">
              Diseñame despacio que tengo prisa
            </h3>

            <div className="space-y-4">
              <p>El diseño ágil ha sido muy útil en muchos casos y corrompido en tantos otros. La velocidad se ha establecido como una de las cualidades de mayor valor, poniéndose en multitud de ocasiones como excusa para sacrificar el espacio destinado a la reflexión. Defendemos la mejora progresiva mediante versiones orientadas a la verdadera entrega de valor, pero rechazamos el trabajo desorientado y movido por la inercia de un plan sin rumbo. Disponer del tiempo para establecer la dirección no debería ser negociable en el momento en el que su recorte suponga un deterioro crítico de la calidad.</p>
              <p>En contra de las metodologías dominantes actuales que premian la rapidez y la inmediatez, nosotras reivindicamos un diseño más juicioso y pausado para un mayor control y un mejor resultado.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/principles/02.png',
            alt: 'Hero',
          }}
          options={{
            reverse: true,
          }}
        >
          <>
            <div className="mb-8">
              <Tag>
                Principio nº2
              </Tag>
            </div>

            <h3 className="mb-4 text-6xl font-display">
              El diseño no se dice, el diseño se hace
            </h3>

            <div className="space-y-4">
              <p>Somos grandes amigas de la buena conversación, pero rechazamos los discursos de venta prefabricados y los argumentos cargados de promesas que jamás se harán realidad. Es por esto que no encontrarás estas prácticas como tapadera de diseños inacabados, erróneamente definidos o inexistentes.</p>
              <p>Nos involucramos radicalmente porque trabajamos solo en aquello en lo que verdaderamente creemos; esto cambia por completo la relación y la forma en la que hacemos diseño.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/principles/03.png',
            alt: 'Hero',
          }}
        >
          <>
            <div className="mb-8">
              <Tag>
                Principio nº3
              </Tag>
            </div>

            <h3 className="mb-4 text-6xl font-display">
              Diseña como te gustaría que diseñaran para ti
            </h3>

            <div className="space-y-4">
              <p>Se trata de nuestro imperativo moral. Nos autoexigimos y comprometemos con un diseño honesto, donde la verdad sea lo que prime y la calidad su resultado.</p>
              <p>Es la razón por la que hacemos de los proyectos ajenos algo nuestro, inyectando una alta dosis de implicación y comprometiéndonos a hacer para cada uno de ellos el mejor trabajo de nuestras vidas.</p>
            </div>
          </>
        </ImgTxt>
      </div>

    </>
  );
};

export default ContentItemPrinciples;
