import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { Scrollama, Step } from 'react-scrollama';

import { motion } from 'framer-motion';

import { CARDS } from 'constants/cards';

import Intro from './intro';
import Section from './section';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const containerRef = useRef<HTMLDivElement>();
  const [stepsProgress, setStepsProgress] = useState({});

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
    console.log(props);
  }, []);

  const handleStepProgress = useCallback((values) => {
    const { data, progress } = values;

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
      >
        {STEPS.map((step) => {
          const stepProgress = stepsProgress[step.id] || 0;

          return (
            <Step data={step.id} key={step.id}>
              <div className="w-full h-full">
                <motion.div
                  key={step.id}
                  style={{
                    zIndex: step.index,
                    opacity: 1 - (stepProgress * 0.75),
                  }}
                  animate={{
                    y: stepProgress * 200,
                    scale: 1 - (stepProgress * 0.05),
                  }}
                  transition={{
                    duration: 0.0,
                    ease: 'easeInOut',
                  }}
                  className="relative w-full h-full origin-bottom"
                >
                  {step.component}
                </motion.div>
              </div>
            </Step>
          );
        })}

      </Scrollama>

    </div>
  );
};

export default Home;
