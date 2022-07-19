import { requestType } from "@store/types";

export type requestsTablePropsType = {
  offset: number;
  items: requestType[];
  onChange: (item: requestType) => void;
  selected: requestType;
  loading: boolean;
  statuses: number[];
};

export type columnsType = {
  id: string;
  label: string;
};
