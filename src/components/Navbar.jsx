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
  }

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUSer } = useContext(AuthContext)

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
    color: "white"
  };

  const inActiveStyles = {
    textDecoration: "none",
    color: "white"
  };

  const handleLogout = () => {
    // para desloguear debo eliminar el Token
    localStorage.removeItem("authToken")
    // Cambiar los valores de los estados de isLoggedIn y loggedUser
    authenticateUSer()
    // Redirecciono al user al home
    navigate("/")
  }
  
  if (isLoggedIn === true){
    return (
      <div style={navStyle}>
        <NavLink to="/" style={toggleStyles}> Home </NavLink>
        {/* <NavLink to="/todos" end={true} style={toggleStyles}> See List </NavLink> */}
        <p>Pizza Hub</p>
        <NavLink to="/user" style={toggleStyles}> Profile </NavLink>
        <span onClick={handleLogout}>Logout</span>
      </div>
    );
  } else {
    return (
      <div style={navStyle}>
        <NavLink to="/" style={toggleStyles}> Home </NavLink>
        <p>Pizza Hub</p>
        <NavLink to="/signup" style={toggleStyles}> Register </NavLink>
        <NavLink to="/login" style={toggleStyles}> Access </NavLink>
      </div>
    );
  }

}

export default Navbar;
