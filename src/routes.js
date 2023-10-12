import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import MasterPage from "./MasterPage/MasterPage";

const Home = lazy(() => import("./Components/Home/Home"));
const PageOne = lazy(() => import("./Components/AntDesign/PageOne/PageOne.tsx"));

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MasterPage />,
      children: [
        { path: "", element: <Navigate to="Home"></Navigate> },
        { path: "Home", element: <Home /> },
        { path: "antd", element: <PageOne /> },
      ],
    },
  ]);
}

export default Router;
