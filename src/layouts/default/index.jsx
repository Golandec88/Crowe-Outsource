import Drawer from "@components/drawer";
import Header from "@components/header";
import useMenu from "@hooks/menu";
import useMessageWatcher from "@hooks/message-watcher";
import useUserInfo from "@hooks/user-info";
import {
  Alert, Box,
  createTheme,
  CssBaseline, Fade, Snackbar, ThemeProvider
} from "@mui/material";
import themeConfig from "@utils/theme-config";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import s from "./style.module.scss";

export default function DefaultLayout() {
  const [themeOptions] = useState(themeConfig("light"));
  const [toastModel, setToastModel] = useState(false);
  const [message, type] = useMessageWatcher(setToastModel);
  const [{ fullName }, role] = useUserInfo();
  const [menu] = useMenu();

  return <>
    <ThemeProvider theme={createTheme(themeOptions)}>
      <Box sx={{ display: "flex", pt: "70px" }}>
        <CssBaseline/>
        <Header title="ABV Outsource CRM"/>
        <Drawer menu={menu} name={fullName} position={role}/>
        <main className={s.default_layout}>
          <Outlet/>
        </main>
      </Box>
      <Snackbar
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toastModel}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </ThemeProvider>
  </>;
}
