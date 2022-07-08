export interface IGlobalState {
  message: {
    text: string;
    type: string;
  };
  loadingFields: {
    authorization: boolean;
    menu: boolean;
    userInfo: boolean;
    roles: boolean;
    classifications: boolean;
    requests: boolean;
    requestUserInfo: boolean;
    projects: boolean;
    operators: boolean;
    clients: boolean;
    transactions: boolean;
    activities: boolean;
  };
}
