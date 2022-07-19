export type dialogsType = {
  model: boolean;
  confirm: (arg?: string) => void;
  close: () => void;
  type: string | null;
  text?: string;
};
