import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "../pages/Directory";
import UserRegister from "../pages/Register";
import UserLogin from "../pages/Login";
import Trash from "../pages/Trash";
import UserProfile from "../pages/Profile";
import PurchasePremium from "../pages/Purchase";
import Home from "../pages/Home";
import About from "../pages/About";
import Notifications from "../pages/Notifications";
import Starred from "../pages/Starred";
import Shared from "../pages/Shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/directory",
    element: <DirectoryView />,
  },
  {
    path: "/directory/:dirID",
    element: <DirectoryView />,
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
    path: "/about",
    element: <About />,
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
    path: "/trash",
    element: <Trash />,
  },
  {
    path: "/purchase-premium",
    element: <PurchasePremium />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
