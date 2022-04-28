import proptypes from "prop-types";

export function requestType() {
  return proptypes.shape({
    fileClassificationId: proptypes.string,
    request: requestInfoType(),
    passportData: passportType()
  });
}

export function passportType() {
  return proptypes.shape({
    serialAndNumber: proptypes.string,
    pinfl: proptypes.string,
    registration: proptypes.string,
    givenPlace: proptypes.string,
    givenDate: proptypes.string,
    expireDate: proptypes.string
  });
}

export function companyInfoType() {
  return proptypes.shape({
    name: proptypes.string,
    tin: proptypes.string,
    address: proptypes.string,
    director: proptypes.string,
    headAccountant: proptypes.string,
    phone: proptypes.string,
    email: proptypes.string,
    bank: bankType(),
  });
}

export function bankType() {
  return proptypes.shape({
    name: proptypes.string,
    mfo: proptypes.string,
    account: proptypes.string
  });
}

export function attachedFilesType() {
  return proptypes.shape({
    name: proptypes.string,
    classificationId: proptypes.string
  });
}

export function classificationType() {
  return proptypes.shape({
    name: proptypes.string,
    subClasses: proptypes.arrayOf(proptypes.shape({
      name: proptypes.string,
      id: proptypes.string
    }))
  });
}

export function requestInfoType() {
  return proptypes.shape({
    id: proptypes.string,
    requestStatus: proptypes.number,
    responseStaffUserId: proptypes.string,
    responceCallCenterOperatorId: proptypes.string,
    sendDate: proptypes.string,
    attachedFiles: proptypes.arrayOf(attachedFilesType()),
    companyInfo: companyInfoType()
  });
}

export function fileCheckTypes() {
  return proptypes.oneOf(["wait", "downloaded", "success", "error"]);
}
