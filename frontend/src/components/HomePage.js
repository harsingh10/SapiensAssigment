/* eslint-disable */
import React from "react";
import Select from "react-select";
import theme from "../Utils/theme";
import useToken from "../Utils/useToken";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const { token, setToken } = useToken();
  const { handleChange } = props;
  const navigate = useNavigate();

  if (!token) {
    console.log("here");
    return <LoginPage handleChange={handleChange} setToken={setToken} />;
  }
  
  let optionsReal = [];
  Object.entries(theme).forEach(([key, value]) => {
    optionsReal.push({
      value: value,
      label: key,
    });
  });

  const logout = () => {
    localStorage.removeItem("token");
    handleChange({ value: "" });
    navigate("/login");
  };

  return (
    <div className="content">
      <h1>Welcome to the Home Page</h1>
      <div className="theme-dropdown">
        <label style={{ marginRight: "10px" }}>Select an option:</label>
        <Select
          className="select-filter"
          onChange={handleChange}
          options={optionsReal}
        />
      </div>
      <div>
        {token && (
          <button className="loginBtn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
