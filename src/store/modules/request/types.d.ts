export type datesType = {
  fromDate: Date;
  toDate: Date;
};
export type filesType = {
  name: string;
  guid: string;
  fileClassificationId: string;
};
export type addManagerActivityType = {
  manager: string;
  client: string;
};
export type requestType = {
  passportData: {
    serialAndNumber: string;
    registration: string;
    givenDate: Date;
    expireDate: Date;
    pinfl: string;
    givenPlace: string;
  };
  phone: string;
  email: string;
  tinKeyPassword: string;
  pinflKeyPassword: string;
  requestServiceType: 1;
  companyInfo: {
    name: string;
    tin: string;
    oked: string;
    address: string;
    bank: {
      name: string;
      account: string;
      mfo: string;
    };
    director: string;
    headAccountant: string;
    phone: string;
    email: string;
  };
  comment: string;
  files: filesType[];
};
