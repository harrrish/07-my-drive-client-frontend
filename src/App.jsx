import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "../pages/Directory";
import UserRegister from "../pages/Register";
import UserLogin from "../pages/Login";
import Trashed from "../pages/Trashed";
import UserProfile from "../pages/Profile";
import PurchasePremium from "../pages/Purchase";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Starred from "../pages/Starred";
import Shared from "../pages/Shared";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/directory",
    element: <DirectoryView key="root" />,
  },
  {
    path: "/directory/:dirID",
    element: <DirectoryView key="folder" />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/starred",
    element: <Starred />,
  },
  {
    path: "/shared",
    element: <Shared />,
  },
  {
    path: "/trashed",
    element: <Trashed />,
  },
  {
    path: "/purchase-premium",
    element: <PurchasePremium />,
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
