import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaTasks,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

const links = [
  { to: "/", label: "Dashboard", icon: <FaHome />, end: true },
  { to: "/subjects", label: "Subjects", icon: <FaBook /> },
  { to: "/tasks", label: "My Tasks", icon: <FaTasks /> },
  { to: "/planner", label: "AI Study Planner", icon: <FaRobot /> },
  { to: "/progress", label: "Progress", icon: <FaChartLine /> },
];

function Sidebar() {
  return (
    <aside className="sidebar p-3">
      <p className="sidebar-heading">WORKSPACE</p>

      <nav className="nav flex-column gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-tip mt-5 p-3">
        <h6>Stay consistent!</h6>
        <p className="small mb-0">
          Small daily improvements lead to big results.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;