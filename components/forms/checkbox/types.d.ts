import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}
