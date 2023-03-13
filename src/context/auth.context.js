import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true)

  // Function to validate Token via BE calling
  const authenticateUSer = async () => {
    setIsFetching(true)
    try {
      const response = await verifyService();
      console.log("Token valido");
      console.log(response);
      setIsLoggedIn(true)
      setLoggedUser(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log("Token no valido o no existe");
      console.log(error);
      setIsLoggedIn(false)
      setLoggedUser(null)
      setIsFetching(false)
    }
  };

  useEffect(() => {
    // User Token authentication
    authenticateUSer()
  }, [])
  

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUSer,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <h2>... Validando credenciales</h2>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
