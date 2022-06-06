import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import SectionItem from 'containers/home/scroller/item/content/common/section';

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

      <SectionItem
        image={{
          src: '/images/services/hero.png',
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
            <p className="text-base">
              El diseño ágil ha sido muy útil en muchos casos y corrompido en tantos otros. La velocidad se ha establecido como una de las cualidades de mayor valor, poniéndose en multitud de ocasiones como excusa para sacrificar el espacio destinado a la reflexión. Defendemos la mejora progresiva mediante versiones orientadas a la verdadera entrega de valor, pero rechazamos el trabajo desorientado y movido por la inercia de un plan sin rumbo. Disponer del tiempo para establecer la dirección no debería ser negociable en el momento en el que su recorte suponga un deterioro crítico de la calidad.
            </p>
            <p className="text-base">
              En contra de las metodologías dominantes actuales que premian la rapidez y la inmediatez, nosotras reivindicamos un diseño más juicioso y pausado para un mayor control y un mejor resultado.
            </p>
          </div>
        </>
      </SectionItem>

      <SectionItem
        image={{
          src: '/images/services/hero.png',
          alt: 'Hero',
        }}
        reverse
      >
        <>
          <div className="mb-8">
            <Tag>
              Principio nº2
            </Tag>
          </div>

          <h3 className="mb-4 text-6xl font-display">
            Diseñame despacio que tengo prisa
          </h3>

          <div className="space-y-4">
            <p className="text-base">
              El diseño ágil ha sido muy útil en muchos casos y corrompido en tantos otros. La velocidad se ha establecido como una de las cualidades de mayor valor, poniéndose en multitud de ocasiones como excusa para sacrificar el espacio destinado a la reflexión. Defendemos la mejora progresiva mediante versiones orientadas a la verdadera entrega de valor, pero rechazamos el trabajo desorientado y movido por la inercia de un plan sin rumbo. Disponer del tiempo para establecer la dirección no debería ser negociable en el momento en el que su recorte suponga un deterioro crítico de la calidad.
            </p>
            <p className="text-base">
              En contra de las metodologías dominantes actuales que premian la rapidez y la inmediatez, nosotras reivindicamos un diseño más juicioso y pausado para un mayor control y un mejor resultado.
            </p>
          </div>
        </>
      </SectionItem>

      <SectionItem
        image={{
          src: '/images/services/hero.png',
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
            Diseñame despacio que tengo prisa
          </h3>

          <div className="space-y-4">
            <p className="text-base">
              El diseño ágil ha sido muy útil en muchos casos y corrompido en tantos otros. La velocidad se ha establecido como una de las cualidades de mayor valor, poniéndose en multitud de ocasiones como excusa para sacrificar el espacio destinado a la reflexión. Defendemos la mejora progresiva mediante versiones orientadas a la verdadera entrega de valor, pero rechazamos el trabajo desorientado y movido por la inercia de un plan sin rumbo. Disponer del tiempo para establecer la dirección no debería ser negociable en el momento en el que su recorte suponga un deterioro crítico de la calidad.
            </p>
            <p className="text-base">
              En contra de las metodologías dominantes actuales que premian la rapidez y la inmediatez, nosotras reivindicamos un diseño más juicioso y pausado para un mayor control y un mejor resultado.
            </p>
          </div>
        </>
      </SectionItem>
    </>
  );
};

export default ContentItemStudio;
