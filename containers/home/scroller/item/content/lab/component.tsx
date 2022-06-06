import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import HeroItem from 'containers/home/scroller/item/content/common/hero';

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

export default ContentItemLab;