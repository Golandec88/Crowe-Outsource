import { IGlobalState } from "@modules/global/types";
import { IProjectState } from "@modules/project/types";
import { IRequestState } from "@modules/request/type";
import { IUserState } from "@modules/user/types";

export interface IRootState {
  [key: string]: any;
  global: IGlobalState;
  user: IUserState;
  project: IProjectState;
  request: IRequestState;
}

export type dispatchType<T> = { type: string; value: T; messageType?: string };

export type loadingType = {
  field: string;
  value: boolean;
};

export type callbackType = (data?: any, user?: any, token?: string) => void;

export type getProjectsType = {
  role: string;
  id: string;
};

export type clientsAndProjectsType = {
  clients: string[];
  project: string;
};

export type operatorActivityType = {
  operator: string;
  client: string;
};

export type projectType = {
  name: string;
  managerId: string;
  picGuid: null;
  requestsIds: string[];
  id: string;
  requests: requestType[];
};

export type commentType = {
  userId: string;
  statusAfterComment: number;
  message: string;
  sendDate: string;
};

export type requestType = {
  request: {
    senderUserId: string;
    requestStatus: number;
    responseStaffUserId: string;
    offerSign: string;
    responceCallCenterOperatorId: string;
    requestServiceType: number;
    sendDate: string;
    submitDate: string;
    isActive: boolean;
    phone: string;
    email: string;
    tinKeyPassword: string;
    pinflKeyPassword: string;
    companyInfo: companyInfoType;
    passportData: passportDataType;
    contractInfo: contractInfo;
    comment: string;
    comments: commentType[];
    attachedFiles: filesType[];
    id: string;
  };
};

export type companyInfoType = {
  name: string;
  tin: string;
  oked: string;
  address: string;
  bank: bankType;
  director: string;
  headAccountant: string;
  phone: string;
  email: string;
};

export type passportDataType = {
  serialAndNumber: string;
  registration: string;
  givenDate: Date;
  expireDate: Date;
  pinfl: string;
  givenPlace: string;
};

export type contractInfo = {
  validityPeriod: {
    startDate: string;
    endDate: string;
  };
  lastPayment: {
    paymentDate: string;
    amount: number;
  };
  contractStatus: number;
};

export type bankType = {
  name: string;
  account: string;
  mfo: string;
};

export type datesType = {
  fromDate: Date;
  toDate: Date;
};

export type filesType = {
  name: string;
  fileName: string;
  guid: string;
  fileClassificationId: string;
};

export type addManagerActivityType = {
  manager: string;
  client: string;
};

export type infoType = {
  id: string;
  userType: "call-center" | "manager";
  responseType: string | null;
  comment: string;
  rejectedFilesList: filesType[];
};

export type authType = {
  timezoneTerm: number;
  login: string;
  password: string;
};

export type registerType = {
  login?: string;
  password: string;
  repeatPassword?: string;
  fullName?: string;
  phoneNumber?: string;
  email: string;
  tin: string;
  phone: string;
};

export type rolesType = {
  [key: number]: string;
};

export type statusesType = {
  [key: number]: string;
};

export type userType = {
  login: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  chiefUserId: string;
  role: number;
  status: number;
  id: string;
};

export type clientType = {
  requestId: string;
  tin: string;
  fullName: string;
  oked: string;
};

export type activitiesType = {
  projectId: string;
  projectName: string;
  projectPicGuid: string;
  clients: clientType[];
};

export type menuType = {
  name: string;
  link: string;
  iconName: string;
};

export type classificationsType = {
  name: string;
  subClasses: classificationsSubClassesType[];
};

export type classificationsSubClassesType = {
  name: string;
  creationDate: string | Date;
  id: string;
};

export type getRequestsType = {
  statuses: number[];
  isSilent: boolean;
};

export type transactionType = {
  transId: string;
  branch: string;
  bOst: string;
  eOst: string;
  tOst: string;
  bOstEqv: string;
  eOstEqv: string;
  tOstEqv: string;
  docNum: string;
  docType: string;
  currency: string;
  debit: string;
  kredit: string;
  debitEqv: string;
  kreditEqv: string;
  name: string;
  inn: string;
  nciFinal: string;
  bankCo: string;
  accCo: string;
  nameCo: string;
  purpose: string;
  allOst: string;
  allDt: string;
  allCt: string;
  id: string;
  stateName: null;
  bdate: string;
  edate: string;
  vdate: string;
  ddate: string;
  ldate: string;
  pdate: string;
  errorCode: string;
  errorNote: string;
  [key: string]: string | null;
};

type actionType<P> = (params: P) => void;
