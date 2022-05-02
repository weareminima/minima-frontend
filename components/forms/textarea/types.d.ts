import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: 'dark' | 'light' | 'minimal';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  state?: Record<string, any>;
}
