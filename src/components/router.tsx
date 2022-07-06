import { BrowserRouter } from "react-router-dom";
import RouterService from "@services/router-service";
import useLocalStorage from "@hooks/local-storage";
import { useSelector } from "react-redux";
import useUserInfo from "@hooks/user-info";
import React from "react";

type userToken = {
  user: {
    token: string | null;
  };
};
export default function Router() {
  const localToken = useLocalStorage("ABV_CRM.token").item;
  const isAuth: boolean = Boolean(
    useSelector(({ user }: userToken) => {
      return user.token || localToken;
    })
  );

  const [{ role }] = useUserInfo();

  return (
    <>
      <BrowserRouter>
        <RouterService isAuth={isAuth} role={role} />
      </BrowserRouter>
    </>
  );
}
