import useMessageWatcher from "@hooks/message-watcher";
import { Alert, CssBaseline, Fade, Snackbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function EmptyLayout() {
  const [toastModel, setToastModel] = useState(false);
  const [message, type] = useMessageWatcher(setToastModel);

  return <>
    <CssBaseline/>
    <Outlet />
    <Snackbar
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={toastModel}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  </>;
}
