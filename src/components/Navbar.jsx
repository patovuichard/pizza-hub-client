import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navStyle = {
    backgroundColor: "#ee3a43",
    color: "white",
    margin: 0,
    padding: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const navigate = useNavigate();

  const { isLoggedIn, authenticateUSer } = useContext(AuthContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogout = () => {
    // para desloguear debo eliminar el Token
    localStorage.removeItem("authToken");
    // Cambiar los valores de los estados de isLoggedIn y loggedUser
    authenticateUSer();
    // Redirecciono al user al home
    navigate("/");
  };

  if (isLoggedIn === true) {
    return (
      <div style={navStyle}>
        <NavLink className="nav-link" to="/" style={toggleStyles}>
          Home
        </NavLink>
        <img
          src={
            "https://res.cloudinary.com/drxbzntov/image/upload/v1678886544/pizza-hub/Logo_gywzsq.png"
          }
          alt="logo"
          width={150}
        />
        <div className="nav-item dropdown">
          <NavLink
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            My info
          </NavLink>
          <ul className="dropdown-menu">
            <NavLink to="/user" style={toggleStyles} className="dropdown-item">
              Profile
            </NavLink>
            <span className="dropdown-item" onClick={handleLogout}>
              Logout
            </span>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div style={navStyle}>
        <NavLink className="nav-link" to="/" style={toggleStyles}>
          Home
        </NavLink>
        <img
          src={
            "https://res.cloudinary.com/drxbzntov/image/upload/v1678886544/pizza-hub/Logo_gywzsq.png"
          }
          alt="logo"
          width={150}
        />
        <div className="nav-item dropdown">
          <NavLink
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            Access
          </NavLink>
          <ul className="dropdown-menu">
            <NavLink
              className="dropdown-item"
              to="/signup"
              style={toggleStyles}
            >
              Register
            </NavLink>
            <NavLink className="dropdown-item" to="/login" style={toggleStyles}>
              Login
            </NavLink>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
