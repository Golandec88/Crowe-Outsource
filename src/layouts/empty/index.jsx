import useMessageWatcher from "@hooks/message-watcher";
import { Alert, CssBaseline, Fade, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function EmptyLayout() {
  const [message, type, model] = useMessageWatcher();

  return <>
    <CssBaseline/>
    <Outlet />
    {model && type ? <Snackbar
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={model}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar> : ""}
  </>;
}
