import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {

  const {authenticateUSer} = useContext(AuthContext)

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleusernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here
    const userCredentials = {
      username: username,
      password: password,
    };
    try {
      // Contactamos al BE para pasarle las credenciales y validarlas
      const response = await loginService(userCredentials)
      console.log(response)
      // Recibir el Token del BE y almacenarlo en el localStorage
      // localStorage.setItem("nombre de data a guardar", "dato a guardar")
      localStorage.setItem("authToken",response.data.authToken)
      // Establecer mi CONTEXTO para decirle a la app, que el usuario esta activo
      authenticateUSer()
      console.log("Token validado");
      navigate("/user")
      setErrorMessage("")
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleusernameChange}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
