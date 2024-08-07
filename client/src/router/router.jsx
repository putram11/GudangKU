import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import CreateGood from "../views/CreateGood";
import UpdateGood from "../views/UpdateGood";



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
    path: "/goods-create",
    element: <CreateGood />,
  },
  { 
    path: "/update/:id",
    element: <UpdateGood />,
  },
]);

export default router;
