import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: 'dark' | 'light';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}
