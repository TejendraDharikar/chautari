import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between xl:w-315 lg:w-150 sm:w-75   p-4 ">
        <NavLink to={"/"} className="text-xl font-bold text-blue-600">
          Chautari
        </NavLink>
        <div className="flex items-center xl:gap-30 text-sm font-medium xl:mr-10
        text-gray-600 sm:gap-12 sm:ml-7">
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
            to="/mypost"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-yellow-700 "
            }
          >
            MyPost
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
            to="/myProfile"
          >
            <img
              src="../t-image.jpg"
              alt="#"
              className="xl:h-15 xl:w-15 border-4 border-gray-500 rounded-full mt-1 ml-1 sm:h-10 sm:border-1 sm:w-20"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
