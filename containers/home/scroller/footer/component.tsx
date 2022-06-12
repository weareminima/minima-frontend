import {
  FC,
} from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import LOGO_SVG from 'svgs/isotype.svg?sprite';

interface ScrollerFooterProps {
}

export const ScrollerFooter: FC<ScrollerFooterProps> = () => {
  return (
    <div
      key="footer"
    >
      <div
        key="background"
        className={cx({
          'relative w-full z-1 overflow-hidden': true,
          'lg:pt-20 md:pt-16 pt-12 ': true,
          'lg:px-8 md:px-6 px-4': true,
        })}
      >
        <div
          className={cx({
            'w-full z-0 overflow-hidden bg-white': true,
          })}
        >
          {/* CONTENT */}
          <div
            key="content"
            className="px-4 text-base md:px-6 lg:px-8 grow"
          >
            <footer
              className={cx({
                'z-10 flex flex-col space-y-16 md:space-y-0 md:flex-row items-center justify-between py-16 md:py-20': true,
              })}
            >
              <Icon icon={LOGO_SVG} className="w-6 h-6" />

              <ul className="flex flex-col space-y-4 text-sm text-center md:space-y-0 md:flex-row md:space-x-4 text-dark">
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                  >
                    Política de privacidad
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                  >
                    Aviso legal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                  >
                    Política de cookies
                  </button>
                </li>
                <li className="text-dark/40">
                  © We are Mínima 2022
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollerFooter;
