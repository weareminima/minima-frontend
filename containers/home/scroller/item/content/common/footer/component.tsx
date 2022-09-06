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
          'relative z-1 overflow-hidden bg-white': true,
          'lg:pt-20 md:pt-16 pt-12': true,
          'lg:-mx-8 md:-mx-6 -mx-4': true,
          'lg:-mb-20 md:-mb-16 -mb-12 ': true,
        })}
      >
        <div
          className={cx({
            'w-full z-0 overflow-hidden': true,
          })}
        >
          <div
            className={cx({
              'absolute top-0 left-0 z-10 overflow-hidden bg-gray-100 w-full lg:h-20 md:h-16 h-12 rounded-b-3xl lg:rounded-b-4xl': true,
            })}
          />
          {/* CONTENT */}
          <div
            key="content"
            className="px-4 text-base md:px-6 lg:px-8 grow"
          >
            <footer
              className={cx({
                'relative z-10 flex flex-col space-y-4 md:space-y-0 md:space-x-8 md:flex-row items-center pt-16 md:pt-14 pb-12 md:pb-10': true,
              })}
            >
              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <Icon icon={LOGO_SVG} className="w-6 h-6" />
                <div className="text-sm text-dark/40">
                  © We are Mínima 2022
                </div>

              </div>

              <ul className="flex flex-col space-y-4 text-sm text-center md:space-y-0 md:flex-row md:space-x-4 text-dark">
                <li>
                  <button
                    type="button"
                    className="hover:opacity-75"
                  >
                    Política de privacidad
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:opacity-75"
                  >
                    Aviso legal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:opacity-75"
                  >
                    Política de cookies
                  </button>
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
