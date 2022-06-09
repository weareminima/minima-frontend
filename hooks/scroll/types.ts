import { ReactNode } from 'react';

export interface ScrollProps {
  scrollX: number;
  scrollY: number;
}

export interface ScrollProviderProps {
  children: ReactNode;
}

export interface ScrollContextProps {
  update: (scroll: ScrollProps) => void;
  scroll: ScrollProps;
}
