import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Setting from "./pages/Setting";
import Bookmarks from "./pages/Bookmarks";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/settings",
    element: <Setting />,
  },
  {
    path: "/bookmarks",
    element: <Bookmarks />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
