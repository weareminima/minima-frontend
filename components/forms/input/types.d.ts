import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'dark' | 'light' | 'minimal';
  status?: 'none' | 'valid' | 'error' | 'disabled';
  mode?: 'dashed' | 'normal';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  state?: Record<string, any>;
  icon?: {
    id: string;
    viewBox: string;
  };
}
