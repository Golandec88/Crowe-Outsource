import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";
import iconCreator from "@utils/icon-creator";

type listType = {
  iconName: string;
  link: string;
  name: string;
};

interface Props {
  list: listType[];
  loading: boolean;
}

const AppMenu: React.FC<Props> = ({ list = [], loading = false }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <List className={s.menu}>
        {loading ? (
          <>
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
            <Skeleton className={s.skeleton} />
          </>
        ) : (
          list.map(({ name, iconName, link }, index) => (
            <Link
              className={`${s.menu_link} ${
                "/" + link === pathname ? s.active : ""
              }`}
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
          ))
        )}
      </List>
    </>
  );
};
function formatIconName(name: string): string {
  switch (name) {
    case "Clipboard":
      return "AssignmentInd";
    default:
      return name;
  }
}

export default AppMenu;
//
// AppMenu.defaultProps = {
//   list: [],
//   loading: false,
// };
