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
    <div className="ms-0 me-0 pt-5 pb-5">
      <h1>Log In</h1>
      <form className="ms-3 me-3 pt-3 pb-3" onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Userame"
            type="username"
            name="username"
            value={username}
            onChange={handleusernameChange}
          />
          <label>Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Password</label>
        </div>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        <button type="submit" className="btn btn-danger mt-3 mb-3 me-3 ms-3">Login</button>
      </form>
    </div>
  );
}

export default Login;
