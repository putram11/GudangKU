import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import CreateGood from "../views/CreateGood";
import UpdateGood from "../views/UpdateGood";
import GoodList from "../views/GoodList";
import RequestForm from "../views/RequestForm";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { 
    path: "/login",
    element: <LoginPage />,
  },
  { 
    path: "/good",
    element: <GoodList />,
  },
  { 
    path: "/form",
    element: <RequestForm />,
  },
  { 
    path: "/goods-create",
    element: <CreateGood />,
  },
  { 
    path: "/update/:id",
    element: <UpdateGood />,
  },

]);

export default router;
