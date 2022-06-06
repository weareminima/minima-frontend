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
          }}
          options={{
            fullScreen: true,
            reverse: true,
            align: 'end',
            imageClassName: 'w-8/12',
            contentClassName: 'w-4/12',
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
          }}
        >
          <>
            <h3 className="mb-4 text-6xl font-display">
              Marcas
            </h3>

            <div className="space-y-4">
              <p>El diseño ágil ha sido muy útil en muchos casos y corrompido en tantos otros. La velocidad se ha establecido como una de las cualidades de mayor valor, poniéndose en multitud de ocasiones como excusa para sacrificar el espacio destinado a la reflexión. Defendemos la mejora progresiva mediante versiones orientadas a la verdadera entrega de valor, pero rechazamos el trabajo desorientado y movido por la inercia de un plan sin rumbo. Disponer del tiempo para establecer la dirección no debería ser negociable en el momento en el que su recorte suponga un deterioro crítico de la calidad.</p>
              <p>En contra de las metodologías dominantes actuales que premian la rapidez y la inmediatez, nosotras reivindicamos un diseño más juicioso y pausado para un mayor control y un mejor resultado.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/services/03.png',
            alt: 'Hero',
          }}
          options={{
            reverse: true,
          }}
        >
          <>
            <h3 className="mb-4 text-6xl font-display">
              Productos
            </h3>

            <div className="space-y-4">
              <p>Somos grandes amigas de la buena conversación, pero rechazamos los discursos de venta prefabricados y los argumentos cargados de promesas que jamás se harán realidad.</p>
              <p>Es por esto que en Mínima no encontrarás estas prácticas como tapadera de diseños inacabados, erróneamente definidos o inexistentes. Nos comprometemos con la aportación, a través del diseño, de un valor significativo para la sociedad y el mundo que aplique al presente y perviva a lo largo del tiempo.</p>
            </div>
          </>
        </ImgTxt>

        <ImgTxt
          image={{
            src: '/images/services/04.png',
            alt: 'Hero',
          }}
        >
          <>
            <h3 className="mb-4 text-6xl font-display">
              Servicios
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

export default ContentItemServices;
