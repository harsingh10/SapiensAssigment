/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, handleChange } = props;

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/users/login", user)
      .then((response) => {
        handleChange({ label: response.data.theme });
        setToken(response.data.token);
        navigate("/homePage");
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          setError("Please create an account!");
        }
        console.error(error);
      });
  };

  
  return (
    <div className="login-form">
      <div className="form-submit">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Email:</label>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          {error.length > 0 ? <p style={{ color: "red" }}>{error}</p> : null}
        </form>
        <div className="signup">
          Don't have an account? <Link to="/signUp">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
