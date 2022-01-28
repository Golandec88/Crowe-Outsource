import useDispatcher from "@hooks/dispatcher";
import useLocalStorage from "@hooks/local-storage";
import { logout as logoutAction } from "@modules/user/creators";
import * as Icon from "@mui/icons-material";
import {
  AppBar, IconButton, Toolbar,
  Typography
} from "@mui/material";
import * as proptypes from "prop-types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import s from "./style.module.scss";

const Header = ({ title }) => {
  const clearUserInfo = useDispatcher(logoutAction);
  const clearLocalToken = useLocalStorage("token").removeItem;
  const redirect = useNavigate();

  const logout = () => {
    clearUserInfo();
    clearLocalToken();
    redirect("/auth");
  };

  return <>
    <AppBar className={s.header}>
      <Toolbar>
        <Typography className={s.title} variant="h6" noWrap component="div">
          {title}
        </Typography>
        <IconButton onClick={logout} color="primary">
          <Icon.ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  </>;
};

Header.propTypes = {
  title: proptypes.string
};

Header.defaultProps = {
  title: "title"
};

export default memo(Header);
