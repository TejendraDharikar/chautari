import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between w-333 p-4 ">
        <NavLink to={"/"} className="text-xl font-bold text-blue-600">
          Chautari
        </NavLink>
        <div className="flex items-center gap-40 text-sm font-medium text-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-yellow-700 "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-yellow-700 "
            }
          >
            Bookmarks
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-yellow-700 "
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-yellow-700 "
            }
          >
            Search
          </NavLink>
          <NavLink
            to="/Profile"
            className={({ isActive }) => (isActive ? "text-blue-500" : "")}
          >
            <img
              src="../t-image.jpg"
              alt="#"
              className="h-15 w-15 border-2 border-blue-500 rounded-full mt-1 ml-1"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
