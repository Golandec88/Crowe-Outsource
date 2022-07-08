import {
  classificationsType,
  requestType,
  statusesEnum,
  transactionType,
} from "@store/types";

export interface IRequestState {
  requests: requestType[];
  classifications: classificationsType[];
  statuses: statusesEnum;
  transactions: transactionType[];
}
