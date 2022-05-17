import { List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import iconCreator from "@utils/icon-creator";
import * as proptypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import s from "./style.module.scss";
import { useTranslation } from "react-i18next";

export default function AppMenu({ list, loading, } ) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return <>
    <List className={s.menu}>
      {loading ? <>
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
        <Skeleton className={s.skeleton} />
      </> : list.map(({ name, iconName, link }, index) => (
        <Link
          className={`${s.menu_link} ${"/" + link === pathname ? s.active : ""}`}
          to={link}
          key={index}
        >
          <ListItemButton className={s.menu_item}>
            <ListItemIcon className={s.icon}>

              {iconCreator(formatIconName(iconName))}
            </ListItemIcon>
            <ListItemText primary={t(name)} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  </>;
}

AppMenu.propTypes = {
  list: proptypes.array,
  loading: proptypes.bool
};

AppMenu.defaultProps = {
  list: [],
  loading: false
};

function formatIconName(name) {
  switch (name) {
    case "Clipboard": return "AssignmentInd";
    default: return name;
  }
}
