import { memo } from "react";
import * as proptypes from "prop-types";
import { useNavigate } from "react-router-dom";

import * as Icon from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import useDispatcher from "@hooks/dispatcher";
import useLocalStorage from "@hooks/local-storage";
import { logout as logoutAction } from "@modules/user/creators";
import LanguageSelect from "@components/header/language-select";

import s from "./style.module.scss";

const Header = ({ title }) => {
  const clearUserInfo = useDispatcher(logoutAction);
  const clearLocalToken = useLocalStorage("ABV_CRM.token").removeItem;
  const clearId = useLocalStorage("ABV_CRM.id").removeItem;
  const redirect = useNavigate();

  const logout = () => {
    clearUserInfo();
    clearLocalToken();
    clearId();
    redirect("/auth");
  };

  return <>
    <AppBar className={s.header}>
      <Toolbar>
        <Typography className={s.title} variant="h6" noWrap component="div">
          {title}
        </Typography>
        <LanguageSelect/>
        <IconButton onClick={logout} color="primary">
          <Icon.ExitToApp/>
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
