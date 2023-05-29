import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3024/users/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else if (response.data.accessToken) {
          sessionStorage.setItem("accessToken", response.data.accessToken);
          navigate("/");
        }
      })
      
  };

  return (
    <div className="loginContainer">
      {error && <h3>{error}</h3>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        placeholder="Your username.."
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        placeholder="Your password.."
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
