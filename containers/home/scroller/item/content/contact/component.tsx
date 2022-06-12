import {
  FC,
} from 'react';

import { useAppSelector } from 'store/hooks';

import useStep from 'hooks/steps';

import Footer from 'containers/home/scroller/item/content/common/footer';
import HeroItem from 'containers/home/scroller/item/content/common/hero';

import Icon from 'components/icon';

import LINK_SVG from 'svgs/link.svg?sprite';

interface ContentItemContactProps {}

export const ContentItemContact: FC<ContentItemContactProps> = () => {
  const {
    steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step: 'contact', steps });

  return (
    <>
      <HeroItem
        subtitle={STEP.subtitle}
        description={STEP.description}
      />

      <div>
        <ul className="divide-y divide-dashed divide-dark/25">
          <li className="py-4 space-y-2">
            <h4 className="text-2xl italic font-display">Dónde estamos</h4>
            <p className="text-base">100% remoto desde Madrid, Pamplona y Donosti</p>
          </li>
          <li className="py-4 space-y-2">
            <h4 className="text-2xl italic font-display">Escríbenos</h4>
            <a
              href="mailto:hello@weareminima.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base inline-flex items-center space-x-1.5"
            >
              <span>hello@weareminima.com</span>
              <Icon icon={LINK_SVG} className="w-2 h-2" />
            </a>
          </li>
          <li className="py-4 space-y-2">
            <h4 className="text-2xl italic font-display">Síguenos</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.instagram.com/weareminima/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base inline-flex items-center space-x-1.5"
                >
                  <span>Instagram</span>
                  <Icon icon={LINK_SVG} className="w-2 h-2" />
                </a>
              </li>
              <li>
                <a
                  href="https://es.linkedin.com/company/weareminima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base inline-flex items-center space-x-1.5"
                >
                  <span>Linkedin</span>
                  <Icon icon={LINK_SVG} className="w-2 h-2" />
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@weareminima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base inline-flex items-center space-x-1.5"
                >
                  <span>Medium</span>
                  <Icon icon={LINK_SVG} className="w-2 h-2" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default ContentItemContact;
