import { ChangeEvent } from 'react';
import { CSSProperties } from 'react';

export interface SelectProps {
  id: string;
  value?: any;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  takeSpace?: boolean;
  required?: boolean;
  options: Object[];
  isMulti?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisable?: boolean
}
