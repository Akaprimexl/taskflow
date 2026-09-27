import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink
          to="/"
          className="logo"
        >
          TaskFlow
        </NavLink>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Lövhələr
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
