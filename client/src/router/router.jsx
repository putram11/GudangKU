import { createBrowserRouter , redirect } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import CreateGood from "../views/CreateGood";
import UpdateGood from "../views/UpdateGood";
import GoodList from "../views/GoodList";
import RequestForm from "../views/RequestForm";
import LogsList from "../views/LogList";
import RootLayout from "../components/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    loader: () => {
      const token = localStorage.getItem("token")
      const role = localStorage.getItem("role")

      if (token) {
        if (role === "Admin") {
          throw redirect ("/good"); 
        } else {
          throw redirect("/log"); 
        }
      }
      return null
    },
    path: "/login",
    element: <LoginPage />,
  },
  {
    loader: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw redirect("/login");
      }
      return null;
    },
    element: <RootLayout />,
    children: [
      { 
        path: "/log",
        element: <LogsList />,
      },
      { 
        path: "/form",
        element: <RequestForm />,
      },
      {
        loader: () => {
          const role = localStorage.getItem("role");
          if (role !== "Admin") {
            throw redirect("/log");
          }
          return null;
        },
        children: [
          { 
            path: "/good",
            element: <GoodList />,
          },
          { 
            path: "/goods-create",
            element: <CreateGood />,
          },
          { 
            path: "/update/:id",
            element: <UpdateGood />,
          },
        ]
      },
    ],
  },
]);
  

export default router;
