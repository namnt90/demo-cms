// types.ts

// Định nghĩa FieldMapping interface
export interface FieldMapping {
  id: number;
  displayName: string;
  sourceField: string;
  format: string;
  formatOptions: string;
}

// Định nghĩa Bundle interface
export interface Bundle {
  id: number;
  name: string;
  shortDesc: string;
  price: string;
  category: string;
  iconUrl: string;
  [key: string]: any;
}

// Định nghĩa Action interface
export interface Action {
  id: number;
  type: 'redirect' | 'dialog' | 'popup';
  config: any;
}

// Định nghĩa DynamicFieldMappingProps interface
export interface DynamicFieldMappingProps {
  field: FieldMapping;
  onUpdate: (field: FieldMapping) => void;
  onRemove: (id: number) => void;
}

// Định nghĩa BundleSelectionDialogProps interface
export interface BundleSelectionDialogProps {
  bundles: Bundle[];
  onSelect: (bundle: Bundle) => void;
  onClose: () => void;
}
