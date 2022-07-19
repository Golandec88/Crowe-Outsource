import { transactionType } from "@store/types";

export type cstTableBodyType = {
  loading: boolean;
  transactions: transactionType[];
  columns: string[];
};
