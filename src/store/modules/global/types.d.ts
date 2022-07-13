export interface IGlobalState {
  [key: string]: any;
  message: {
    [key: string]: any;
    text: string;
    type: string;
  };
  loadingFields: {
    [key: string]: any;
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
