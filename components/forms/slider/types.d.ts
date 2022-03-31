export interface SliderProps {
  /**
   * ID of the input (required)
   */
  id?: string;
  /**
   * Theme of the component
   */
  theme?: 'dark' | 'light';

  meta?: Record<string, unknown>;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Format of the value
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * Reference to the input's label
   */
  labelRef: React.MutableRefObject<HTMLLabelElement | null>;
  /**
   * Minimum allowed value
   */
  minValue?: number;
  /**
   * Maximum allowed value
   */
  maxValue?: number;
  /**
   * Minimum increment value
   */
  step?: number;
  /**
   * Value of the input (controlled mode)
   */
  value?: number | unknown;
  /**
   * Default value of the input (uncontrolled mode)
   */
  defaultValue?: number | unknown;
  /**
   * Callback executed when the input's value changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback executed when the input receives focus
   */
  onFocus?: React.FocusEventHandler;
  /**
   * Callback executed when the input loses focus
   */
  onBlur?: React.FocusEventHandler;
}
