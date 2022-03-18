import * as Icon from "@mui/icons-material";
import { List, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import s from "./style.module.scss";

const menu = [
  {
    name: "Почта",
    icon: <Icon.Email/>
  },
  {
    name: "Поддержка",
    icon: <Icon.SupportAgent/>
  },
  {
    name: "Настройки",
    icon: <Icon.Settings/>
  }
];

export default function AppBottomMenu() {
  return <>
    <List className={s.bottom_menu}>
      {menu.map((elem, index) => (
        <Tooltip title={elem.name} key={index}>
          <ListItem className={s.menu_item} button>
            <ListItemIcon className={s.icon}>
              {elem.icon}
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  </>;
}
