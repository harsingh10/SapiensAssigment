import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };

    axios
      .post(
        "https://sapiensassignment-backend.onrender.com/api/users/signUp",
        user
      )
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login-form">
      <div className="form-submit">
        <h1 className="login-header">SignUp</h1>
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
            SignUp
          </button>
        </form>
        <div className="signup">
          Do have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
