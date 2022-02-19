import Avatar from "@components/drawer/__partials/avatar";
import BottomMenu from "@components/drawer/__partials/bottom-menu";
import Logo from "@components/drawer/__partials/logo";
import Menu from "@components/drawer/__partials/menu";
import { Divider, Drawer } from "@mui/material";
import * as proptypes from "prop-types";
import { memo } from "react";
import { useSelector } from "react-redux";
import s from "./style.module.scss";

const AppDrawer = ({ menu, name, position }) => {
  const loading = {
    info: useSelector(({ user }) => user.info.loading),
    menu: useSelector(({ user }) => user.menu.loading)
  };

  return <>
    <Drawer
      className={s.drawer}
      classes={{ paper: s.drawer }}
      variant="persistent"
      anchor="left"
      open
    >
      <Logo/>
      <Divider className={s.divider}/>
      <Avatar name={name} position={position} loading={loading.info}/>
      <Divider className={s.divider}/>
      <Menu list={menu} loading={loading.menu}/>
      <Divider className={`${s.divider} ${s.mt_auto}`}/>
      <BottomMenu/>
    </Drawer>
  </>;
};

AppDrawer.propTypes = {
  menu: proptypes.array,
  name: proptypes.string,
  position: proptypes.string
};

export default memo(AppDrawer);