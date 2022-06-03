import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';
import SectionItem from 'containers/home/scroller/item/content/common/section';

interface ContentItemStudioProps {}

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
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
        </>
      </SectionItem>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis quidem praesentium veritatis ipsam, autem ex
        consequuntur atque iste rem repellendus aliquam!
        Non magni ex dicta, minima quod error adipisci iusto.
      </div>
    </>
  );
};

export default ContentItemStudio;
