import { InputHTMLAttributes } from 'react';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'dark' | 'light';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}
