import { classificationsType, filesType, requestType } from "@store/types";

export type fileTableType = {
  selected: requestType;
  statuses: number[];
  checkedList: filesType[];
  setCheckList: (value: filesType[]) => void;
};

export type selectTableType = {
  files: filesType[];
  classifications: classificationsType[];
  status: number;
  checkedList: filesType[];
  setCheckList: (value: filesType[]) => void;
};

export type fileItemType = {
  type: string;
  counter: number;
  classifications: classificationsType[];
  info: filesType;
  onChange: (index: number, value: string) => void;
  status: number;
};
