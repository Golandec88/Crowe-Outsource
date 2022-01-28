import { Navigate } from "react-router-dom";

import DefaultLayout from "@src/layouts/default";
import EmptyLayout from "@src/layouts/empty";

import Auth from "@views/auth";
import Users from "@views/users";
import Archive from "@views/archive";
import Requests from "@views/requests";
import Projects from "@views/projects";
import Settings from "@views/settings";
import Dashboard from "@views/dashboard";
import Operators from "@views/operators";

const Router = (isAuth = false) => {
  const privateRoute = route => {
    if(isAuth) return route;
    return { path: route.path, element: <Navigate to="/auth" /> };
  };

  return [
    { path: "auth", element: <EmptyLayout />, children: [
      { index: true, element: <Auth /> }
    ] },
    privateRoute({ path: "/", element: <DefaultLayout />, children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "archive", element: <Archive /> },
      { path: "requests", element: <Requests /> },
      { path: "projects", element: <Projects /> },
      { path: "settings", element: <Settings /> },
      { path: "operators", element: <Operators /> }
    ] }),
  ];
};

export default Router;