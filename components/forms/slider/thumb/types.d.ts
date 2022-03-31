import { SliderState } from '@react-stately/slider';

export interface ThumbProps {
  theme: 'dark' | 'light';
  status: 'none' | 'valid' | 'error' | 'disabled';
  sliderState: SliderState;
  trackRef: React.MutableRefObject<HTMLElement | null>;
  isDisabled: boolean;
  id?: string;
}
