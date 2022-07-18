import { Navigate, useRoutes, RouteObject } from "react-router-dom";

import DefaultLayout from "@src/layouts/default";
import EmptyLayout from "@src/layouts/empty";

import Auth from "@views/auth";
import ManagerRequests from "@views/manager-requests";
import ManagerProjects from "@views/manager-projects";
import Operators from "@views/operators";
import Activity from "@views/activity";
import Requests from "@views/requests";
import Transactions from "@views/transactions";
import RegisterUser from "@views/register";
import ActivityArchive from "@views/activity-archive";
import ClientsArchive from "@views/clients-archive";
import OperatorProjects from "@views/operator-projects";
import RequestsArchive from "@views/requests-archive";
import FileShare from "@views/file-share";
import ClientInfo from "@components/tables/file-share/ClientInfo";
import CreateRequest from "@views/create-request";
import History from "@views/history";
import { routerServiceType } from "@services/types";
import React from "react";

export default function RouterService({ isAuth, role }: routerServiceType) {
  const schema: RouteObject[] = [
    {
      path: "auth",
      element: <EmptyLayout />,
      children: [{ index: true, element: <Auth /> }],
    },
    PrivateRoute(
      {
        path: "/",
        element: <DefaultLayout />,
        children: getRoutesList(role),
      },
      isAuth
    ),
  ];

  return useRoutes(schema);
}

function getRoutesList(role: number): RouteObject[] {
  switch (role) {
    case 1: {
      // Manager
      return [
        { path: "manager-requests", element: <ManagerRequests />, index: true },
        { path: "manager-projects", element: <ManagerProjects /> },
        { path: "operator-projects", element: <OperatorProjects /> },
        { path: "activity", element: <Activity /> },
        { path: "operators", element: <Operators /> },
        { path: "transactions", element: <Transactions /> },
        { path: "call-center", element: <Requests /> },
        { path: "register", element: <RegisterUser /> },
        { path: "activity-archive", element: <ActivityArchive /> },
        { path: "clients-archive", element: <ClientsArchive /> },
        { path: "file-share", element: <FileShare /> },
        { path: "client-info/:id", element: <ClientInfo /> },
        { path: "create-request", element: <CreateRequest /> },
        { path: "history", element: <History /> },
        { path: "/", element: <Navigate to="manager-requests" /> },
      ];
    }
    case 2: {
      // Operator
      return [
        { path: "activity", element: <Activity />, index: true },
        { path: "operator-projects", element: <OperatorProjects /> },
        { path: "call-center", element: <Requests /> },
        { path: "register", element: <RegisterUser /> },
        { path: "activity-archive", element: <ActivityArchive /> },
        { path: "clients-archive", element: <ClientsArchive /> },
        { path: "create-request", element: <CreateRequest /> },
        { path: "history", element: <History /> },
        { path: "file-share", element: <FileShare /> },
        { path: "client-info", element: <ClientInfo /> },
        { path: "/", element: <Navigate to="activity" /> },
      ];
    }
    case 3: {
      // CallCenterOperator
      return [
        { path: "requests", element: <Requests />, index: true },
        { path: "register", element: <RegisterUser /> },
        { path: "requests-archive", element: <RequestsArchive /> },
        { path: "create-request", element: <CreateRequest /> },
        { path: "history", element: <History /> },
        { path: "/", element: <Navigate to="requests" /> },
      ];
    }
    default: {
      return [] as RouteObject[];
    }
  }
}

function PrivateRoute(route: RouteObject, isAuth: boolean): RouteObject {
  if (isAuth) return route;
  return { path: route.path, element: <Navigate to="/auth" /> };
}