import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'dark' | 'light';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}
