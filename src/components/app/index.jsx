import useLocalStorage from "@hooks/local-storage";
import routes from "@src/router";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import "./global.css";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  window.__proto__.$t = t;

  const localToken = useLocalStorage("token").item;
  const token = useSelector(({ user }) => {
    if(user.token) return user.token;
    return localToken;
  });

  const info = useSelector(({ user }) => user.info.items);

  return useRoutes(routes(Boolean(token), info ? info.role : 4));
}
