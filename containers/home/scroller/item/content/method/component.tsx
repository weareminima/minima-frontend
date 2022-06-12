import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import ImgTxt from 'containers/home/scroller/item/content/common/img-txt';

import Tag from 'components/tag';

interface ContentItemMethodProps {}

export const ContentItemMethod: FC<ContentItemMethodProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'method', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <ImgTxt
        image={{
          src: '/images/method/01.png',
          alt: 'Hero',
          width: 1280,
          height: 1280,
        }}
        options={{
          fullScreen: true,
          reverse: true,
          align: 'end',
        }}
      >
        <>
          <div className="mb-8">
            <Tag>
              Nuestra metodología
            </Tag>
          </div>

          <div className="space-y-4">
            <p className="text-3xl italic font-display">No tenemos recetas, sino una forma de ver el diseño como una disciplina híbrida, plástica y en cierto modo de naturaleza anárquica.</p>
            <p>En Mínima reconocemos que nunca hacemos las cosas de la misma manera porque no creemos en la estandarización de problemas ni de soluciones. Sabemos que un análisis crítico y honesto revelará las condiciones particulares, únicas e irrepetibles que conducirán a la necesidad de una propuesta a medida.</p>
            <p>Nuestro modo de hacer exige cambiar constantemente de mirada para descubrir realidades anteriormente ocultas y poder entenderlas, cuestionarlas y reformularlas. Significa estar abierto a trabajar en diferentes sectores y con distintas disciplinas, por lo que hemos mantenido un modelo relativamente sencillo y flexible enfocado en tres grandes estadios:</p>

            <ul className="divide-y divide-dashed divide-dark/25">
              <li className="py-4">
                <h4 className="text-2xl italic font-display">Filosófico</h4>
                <p>Reflexión para dirigir la ejecución.</p>
              </li>
              <li className="py-4">
                <h4 className="text-2xl italic font-display">Creativo</h4>
                <p>Diálogo para desplegar posibilidades.</p>
              </li>
              <li className="py-4">
                <h4 className="text-2xl italic font-display">Técnico</h4>
                <p>Colaboración para dar a luz realidades.</p>
              </li>
            </ul>
          </div>
        </>
      </ImgTxt>
    </>
  );
};

export default ContentItemMethod;
