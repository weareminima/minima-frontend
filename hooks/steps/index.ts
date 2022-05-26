import { useMemo } from 'react';

import { CARDS } from 'constants/cards';

export default function useStep({
  step,
  steps,
}) {
  return useMemo(() => {
    const S = steps.find((s) => s.id === step) || {} as any;
    const C = CARDS.find((c) => c.id === step) || {} as any;

    return {
      ...S,
      ...C,
    };
  },
  [step, steps]);
}
