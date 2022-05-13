import DefaultLayout from "@src/layouts/default";
import EmptyLayout from "@src/layouts/empty";
import Archive from "@views/archive";
import Auth from "@views/auth";
import Dashboard from "@views/dashboard";
import Operators from "@views/operators";
import Projects from "@views/projects";
import Requests from "@views/requests";
import Settings from "@views/settings";
import Users from "@views/users";
import TransactionsPage from "@views/transactions";
import { Navigate } from "react-router-dom";

const Router = (isAuth = false, role) => {
  const privateRoute = route => {
    if (isAuth) return route;
    return { path: route.path, element: <Navigate to="/auth"/> };
  };
  return [
    {
      path: "auth", element: <EmptyLayout/>, children: [
        { index: true, element: <Auth/> }
      ]
    },
    privateRoute({
      path: "/", element: <DefaultLayout/>, children: [
        { path: "dashboard", element: <Dashboard/>, index: role !== 3 },
        { path: "users", element: <Users/> },
        { path: "archive", element: <Archive/> },
        { path: "requests", element: <Requests/>, index: role === 3 },
        { path: "requests/:id", element: <Requests/>, index: role === 3 },
        { path: "projects", element: <Projects/> },
        { path: "settings", element: <Settings/> },
        { path: "operators", element: <Operators/> },
        { path: "transactions", element: <TransactionsPage/> , index : role === 1 },
        { path: "/", element: <Navigate to={role !== 3 ? "/dashboard" : "/requests"}/> }
      ]
    }),
  ];
};

export default Router;
