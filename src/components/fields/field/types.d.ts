import { UseFormReturn } from "react-hook-form/dist/types/form";
import { formType } from "@views/register/types";

export type fieldType<T> = {
  type: string;
  label: string;
  name: string;
  required: boolean;
  rules: T;
  fullWidth: boolean;
  mask?: string;
  readOnly?: boolean;
} & UseFormReturn<formType>;

export type TextMaskCustomType = {
  onChange: (value: TMCOnChangeType) => void;
  mask: string;
  name: string;
};

export type TMCOnChangeType = {
  name: string;
  value?: string | null;
};
