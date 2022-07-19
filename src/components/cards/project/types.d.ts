export type projectCardType = {
  name: string;
  id: string;
  onChange: (type: string, id: string) => void;
  role: string;
  loading: boolean;
};
