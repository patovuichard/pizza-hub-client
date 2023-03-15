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
    <div className="ms-0 me-0 pt-5 pb-5">
      <h1>Sign Up</h1>
      <form className="ms-3 me-3 pt-3 pb-3" onSubmit={handleSignup}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Userame"
            type="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
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
        <div className="form-floating">
          <select
            className="form-select" aria-label="Floating label select example"
            name="role"
            onChange={(event) => {
              setRole(event.target.value);
            }}
          >
            <option value=""> </option>
            <option value="Client">Client</option>
            <option value="Restaurant">Restaurant</option>
          </select>
          <label htmlFor="role">Role</label>
        </div>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit" className="btn btn-danger mt-3 mb-3 me-3 ms-3">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
