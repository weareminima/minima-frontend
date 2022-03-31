import type { FieldValidator, FieldState } from 'final-form';
import validate from 'validate.js';

export const composeValidators = (validations: unknown[]) =>
  (
    value: unknown,
    allValues: Record<string, unknown>,
    meta?: FieldState<unknown>,
  ): FieldValidator<unknown>[] => {
    if (validations) {
      const errors = validations.map((validator: unknown) => {
        if (typeof validator === 'function') {
          return validator(value, allValues, meta);
        }

        if (validator) {
          return validate.single(value, validator);
        }

        return undefined;
      }, []);

      if (errors.some((e) => !!e)) {
        return errors;
      }
    }

    return undefined;
  };

export const booleanValidator = (value: boolean): string | unknown => {
  if (!value) return 'Error';

  return undefined;
};

export const arrayValidator = (value: unknown[]): string | unknown => {
  if (!value || !value.length) return 'Error';

  return undefined;
};

export default {
  composeValidators,
};
