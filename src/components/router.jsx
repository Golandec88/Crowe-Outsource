import { BrowserRouter } from "react-router-dom";
import proptypes from "prop-types";
import RouterService from "@services/router-service";
import useLocalStorage from "@hooks/local-storage";
import { useSelector } from "react-redux";
import useUserInfo from "@hooks/user-info";

export default function Router () {
  const localToken = useLocalStorage("ABV_CRM.token").item;
  const isAuth = Boolean(useSelector(({ user }) => user.token || localToken));
  const [{ role }] = useUserInfo();

  return <>
    <BrowserRouter>
      <RouterService isAuth={isAuth} role={role}/>
    </BrowserRouter>
  </>;
}

Router.propTypes = {
  isAuth: proptypes.bool,
  role: proptypes.oneOf([1,2,3,4])
};
