import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div>
      <div>deshboard</div>
      <nav>
        <NavLink
        to="/home"
         className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-white "
            }
        >Home</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
