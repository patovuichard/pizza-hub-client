import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    // Pasamos a contactar al BE para crear un user
    const newUser = {
      username: username,
      password: password,
    };
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      // Vamos a determinar el tipo de error que recibimos y actuar acorde al caso
      console.log(error.response.status); // Codigo de error enviado
      console.log(error.response.data.errorMessage); // El mensaje de error que dio el fallo
      if (error.response.status === 400) {
        // Mostrar al user como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
