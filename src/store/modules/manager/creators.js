import * as types from "./types";
import Request from "@utils/request";

export const getTransactions = dispatch => {
  Request({
    method: "GET",
    url: "/crm/Utils/GetTransactions",
    type: types.GET_TRANSACTIONS,
    loadingField: "transactions",
    params: {
      tin: "306865819", fromDate: "2022-05-01", toDate: "2022-05-09"
    },
    dispatch
  }).then(({ data }) => {
    const result = [];
    for (const item of data) {
      if (item.debit > 0 ) result.push(item);
    }
    dispatch({
      type: types.SET_TRANSACTIONS, value: result
    });
  });
};


// const token = localStorage.getItem("ABV_CRM.token");
// let config = {
//   headers: {
//     "Authorization": "Bearer " + token
//   }
// };
