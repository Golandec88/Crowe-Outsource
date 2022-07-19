import { clientType, requestType } from "@store/types";

export type clientsType = {
  model: boolean;
  close: () => void;
  clients: requestType[] | clientType[];
  loading: boolean;
  disableAdd: boolean;
  id: string;
};
// clients={
//     role === "manager"
//     ? clients
//     : selected
//         ? items.find((item) => item.id === selected)?.requests
//         : []
// }
// loading={clientsLoading}
// id={selected}
// disableAdd={role === "operator"}
