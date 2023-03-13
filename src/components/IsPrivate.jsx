import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === true) {
    // Solo renderizo el contenido si el usuario esta activo
    return props.children;
  } else {
    // Si el usuario no esta activo lo redirecciono a login
    return <Navigate to={"/login"} />;
  }
}

export default IsPrivate;
