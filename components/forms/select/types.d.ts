import { ReactNode, FocusEventHandler } from 'react';

interface SelectThemeProps {
  theme: 'dark' | 'light';
  size: 'base' | 's';
  status?: 'none' | 'error' | 'valid' | 'disabled';
  maxHeight?: number | string;
}

interface SelectStatusProps {
  meta?: Record<string, unknown>;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
}

export interface SelectOptionProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  enabled?: boolean;
  checkbox?: boolean;
}
interface SelectDataProps {
  options?: SelectOptionProps[];
  placeholder?: string;
  prefix?: string;
  initialSelected?: string | string[];
  selected?: string | string[];
  initialValues?: string | string[];
  values?: string | string[];
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
}

export interface SelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  onChange?: (selection: string | string[]) => void;
  onSelect?: (option: SelectOptionProps | SelectOptionProps[]) => void;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
}

export interface SelectMenuProps extends SelectStatusProps, SelectThemeProps {
  children: ReactNode;
  opened: boolean;
  attributes: Record<string, unknown>;
}

export interface SelectToggleProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  opened: boolean;
  selectedItems: SelectOptionProps[];
  getToggleButtonProps: (e?: unknown) => void;
  getDropdownProps?: (e?: unknown) => void;
}
