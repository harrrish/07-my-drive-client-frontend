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
import About from "../pages/About";
import Upgraded from "../pages/Upgraded";
import Projects from "../pages/Projects";
import LoginActivity from "../pages/LoginActivity";
import ForgetPassword from "../pages/ForgetPassword";
import GooglePassword from "../pages/GooglePassword";

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
    path: "/login-activity",
    element: <LoginActivity />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/add-password",
    element: <GooglePassword />,
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
    path: "/purchase",
    element: <PurchasePremium />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/upgraded",
    element: <Upgraded />,
  },
  {
    path: "/projects",
    element: <Projects />,
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
