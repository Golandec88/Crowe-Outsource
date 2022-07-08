export default function (status: number) {
  switch (status.toString()) {
    case "0":
      return "#1dd1a1"; // CallCenterSubmited
    case "1":
      return "#2ed573"; // CallCenterInProcess
    case "2":
      return "#b71540"; // CallCenterRejected
    case "3":
      return "#f6b93b"; // CallCenterSendedBack
    case "4":
      return "#1dd1a1"; // ManagerSubmited
    case "5":
      return "#b71540"; // ManagerRejected
    case "6":
      return "#2ed573"; // ManagerInProcess
    case "7":
      return "#f6b93b"; // ManagerSendedBack
    default:
      return "#dfe4ea";
  }
}
