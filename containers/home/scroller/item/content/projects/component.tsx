import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';

interface ContentItemProjectsProps {}

export const ContentItemProjects: FC<ContentItemProjectsProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'projects', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />
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

export default ContentItemProjects;
