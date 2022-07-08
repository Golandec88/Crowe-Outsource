import {
  Box,
  createTheme,
  CssBaseline,
  Fade,
  Snackbar,
  ThemeProvider,
  Alert,
} from "@mui/material";
import Drawer from "@components/drawer";
import Header from "@components/header";
import useMenu from "@hooks/menu";
import useUserInfo from "@hooks/user-info";
import themeConfig from "@utils/theme-config";
import { Outlet } from "react-router-dom";
import s from "./style.module.scss";
import useMessageWatcher from "@hooks/message-watcher";
import { useState } from "react";

export default function DefaultLayout() {
  const [message, type, toastModel] = useMessageWatcher();
  const [themeOptions] = useState(themeConfig("light"));
  const [{ fullName }, role] = useUserInfo();
  const [menu] = useMenu();

  return (
    <>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <Box sx={{ display: "flex", pt: "70px" }}>
          <CssBaseline />
          <Header title="ABV Outsource CRM" />
          <Drawer menu={menu} name={fullName} position={role} />
          <main className={s.default_layout}>
            <Outlet />
          </main>
        </Box>
        {toastModel && type && (
          <Snackbar
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toastModel}
          >
            <Alert severity={type}>{message}</Alert>
          </Snackbar>
        )}
      </ThemeProvider>
    </>
  );
}
