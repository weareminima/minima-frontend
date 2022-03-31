import { useMemo } from 'react';

interface UseStatusProps {
  active?: boolean;
  meta: Record<string, unknown>;
  disabled: boolean;
}

const useStatus = ({
  active = true,
  meta,
  disabled,
}: UseStatusProps): 'none' | 'error' | 'valid' | 'disabled' => {
  const status = useMemo(() => {
    if (disabled) return 'disabled';
    if (meta.touched && meta.error) return 'error';

    if (!active) return 'none';
    if (meta.touched && meta.valid) return 'valid';

    return 'none';
  }, [active, meta, disabled]);

  return status;
};

export default useStatus;
