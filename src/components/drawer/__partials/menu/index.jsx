import { List, ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import iconCreator from "@utils/icon-creator";
import * as proptypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import s from "./style.module.scss";

const iconNameFormatter = name => {
  const first = name.substring(3);

  switch(first) {
    case "UserPlus": return "Group";
    case "Pencil": return "Edit";
    case "Clipboard": return "NoteAlt";
    default: return first;
  }
};

export default function AppMenu({ list, loading, } ) {
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
          className={`${s.menu_link} ${(link === "/dashboard" ? "/" : link) === pathname ? s.active : ""}`}
          to={link === "/dashboard" ? "/" : link}
          key={index}
        >
          <ListItem className={s.menu_item} button>
            <ListItemIcon className={s.icon}>
              {iconCreator(iconNameFormatter(iconName))}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
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
