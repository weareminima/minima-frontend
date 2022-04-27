import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { Scrollama, Step } from 'react-scrollama';

import cx from 'classnames';

import { CARDS } from 'constants/cards';

import Intro from './intro';
import Section from './section';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const containerRef = useRef<HTMLDivElement>();
  const [stepsProgress, setStepsProgress] = useState({});
  const stepsProgressRef = useRef({});

  const STEPS = useMemo(() => {
    return [
      {
        id: 'intro',
        index: 0,
        component: <Intro />,
      },
      ...CARDS.map((c) => ({
        id: c.id,
        index: c.index,
        component: <Section {...c} />,
      })),
    ];
  }, []);

  const handleSize = useCallback(() => {
    const container = containerRef.current;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
  }, []);

  const handleStepEnter = useCallback((props) => {
    console.info(props);
  }, []);

  const handleStepProgress = useCallback((values) => {
    const { data, progress } = values;

    stepsProgressRef.current = {
      ...stepsProgressRef.current,
      [data]: progress,
    };

    setStepsProgress({
      ...stepsProgress,
      [data]: progress,
    });
  }, [stepsProgress]);

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen"
    >
      <Scrollama
        onStepEnter={handleStepEnter}
        onStepProgress={handleStepProgress}
        offset={0}
        threshold={1}
      >
        {STEPS.map((step) => {
          const stepProgress = stepsProgressRef.current[step.id] || 0;

          return (
            <Step data={step.id} key={step.id}>
              <div
                className={cx({
                  'w-full px-8 h-full': true,
                  // 'h-full': step.id === 'intro',
                  // 'h-[200%]': step.id !== 'intro',
                })}
              >
                <div
                  key={step.id}
                  style={{
                    zIndex: step.index,
                    ...step.id !== 'intro' && {
                      opacity: 1 - (stepProgress * 1),
                      transform: `scale(${1 - (stepProgress * 0.1)}) translateY(${parseInt(`${stepProgress * 100}`, 10)}%)`,
                      transition: 'transform 0.1s linear',
                    },
                  }}
                  className="relative w-full h-full origin-bottom will-change-transform"
                >
                  {step.component}
                </div>
              </div>
            </Step>
          );
        })}

      </Scrollama>

    </div>
  );
};

export default Home;
