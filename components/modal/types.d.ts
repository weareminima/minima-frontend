import { ReactNode } from 'react';

export interface ModalProps {
  /**
   * Title used by screen readers
   */
  title: string;
  /**
   * Whether the modal is opened
   */
  open: boolean;
  /**
   * Whether the user can close the modal by clicking on the overlay, the close button or pressing
   * the escape key
   */
  dismissable?: boolean;
  /**
   * Size (width) of the modal
   */
  size?: 'narrow' | 'default' | 'wide';
  children?: ReactNode;
  /**
   * Class name to assign to the modal
   */
  className?: string;
  /**
   * Callback executed when the modal is dismissed by clicking on the overlay, the close button or
   * pressing the escape key
   */
  onDismiss: () => void;
}
