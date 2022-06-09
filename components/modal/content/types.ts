import { ModalProps } from '../types';

export type ModalContentProps = ModalProps & {
  /** Size of the viewport in which the modal is rendered */
  viewport: string;

  floating: any;
  getFloatingProps: any;
};
