import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <FaBookOpen />
          CivilPrep AI
        </Link>

        <span className="navbar-text text-white">
          Your UPSC preparation companion
        </span>
      </div>
    </nav>
  );
}

export default Navbar;