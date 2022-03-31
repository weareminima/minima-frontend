// react types
import { AriaSearchFieldProps } from '@react-types/searchfield';

export interface SearchProps extends AriaSearchFieldProps {
  theme?: 'dark' | 'light';
  size: 'sm' | 'base';
}
