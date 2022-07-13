import {
  classificationsType,
  requestType,
  statusesType,
  transactionType,
} from "@store/types";

export interface IRequestState {
  requests: requestType[];
  classifications: classificationsType[];
  // statuses: statusesType;
  statuses: string[];
  transactions: transactionType[];
}
