export interface ButtonProperties {
  className: string;
  label: string;
  onClick: () => void;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
}
