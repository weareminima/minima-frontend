import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import ImgTxt from 'containers/home/scroller/item/content/common/img-txt';

import Tag from 'components/tag';

interface ContentItemLabProps {}

export const ContentItemLab: FC<ContentItemLabProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'lab', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <ImgTxt
        image={{
          src: '/images/lab/01.png',
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
              Mínima Lab
            </Tag>
          </div>

          <div className="space-y-4">
            <p>El Lab de Mínima se ha creado como una unidad de experimentación cuya función es la de entrenar la mirada, provocar el pensamiento y poner a prueba ideas sin límites.</p>
            <p>De esta forma, lanzamos proyectos propios, investigamos metodologías, abrimos debates sobre desafíos contemporáneos o testamos tecnologías combinando enfoques tanto empíricos como teóricos.</p>
            <p className="text-3xl italic font-display">Para nosotras es un espacio de juego y aprendizaje donde probar conceptos dirigidos por la pasión, libertad e imaginación.</p>
          </div>
        </>
      </ImgTxt>
    </>
  );
};

export default ContentItemLab;
