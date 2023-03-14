import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      role: role,
    };
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      console.log(error.response.status); // Codigo de error enviado
      console.log(error.response.data.errorMessage); // El mensaje de error que dio el fallo
      if (error.response.status === 400) {
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
        <label htmlFor="role">Role: </label>
        <select
          name="role"
          onChange={(event) => {
            setRole(event.target.value);
          }}
        >
          <option value=""> </option>
          <option value="Client">Client</option>
          <option value="Restaurant">Restaurant</option>
        </select>
        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
