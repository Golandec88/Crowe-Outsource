import { Alert, Slide, Snackbar } from "@mui/material";
import { initialState, NotificationsContext } from "@services/notifications-service";
import { useState } from "react";
import proptypes from "prop-types";

export default function Notification() {
  const [open] = useState(false);
  const [{ type, message }, setValue] = useState(initialState);

  // useEffect(() => {
  //   if(type && message) setOpen(true);
  // }, [type, message]);

  return <>
    <NotificationsContext.Provider value={{ type, message, setValue }}>
      <Snackbar
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </NotificationsContext.Provider>
  </>;
}

Notification.propTypes = {
  type: proptypes.oneOf(["success", "info", "warning", "error"]),
  message: proptypes.string
};

Notification.defaultProps = {
  type: "success"
};
