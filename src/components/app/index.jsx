import useLocalStorage from "@hooks/local-storage";
import routes from "@src/router";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import "./global.css";

const App = () => {
  const localToken = useLocalStorage("token").item;
  const token = useSelector(({ user }) => user.token ? user.token : localToken);

  return useRoutes(routes(Boolean(token)));
};

export default App;