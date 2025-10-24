import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./pages/AddPost";
import Bookmarks from "./pages/Bookmarks";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import MyPost from "./pages/MyPost";
import AddPost from "./pages/AddPost";
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
    path: "/myprofile",
    element: <MyProfile />,
  },
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/mypost",
    element: <MyPost />,
  },
  {
    path:"/addpost",
    element:<AddPost/>
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
