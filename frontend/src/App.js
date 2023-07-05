/* eslint-disable */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import themes from "./Utils/theme";
import axios from "axios";

import useToken from "./Utils/useToken";

function App() {
  const [theme, setTheme] = useState("");
  const { token, setToken } = useToken();

  const saveThemeInDB = useCallback(async (theme) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("token")) || token;
      const res = await axios.post(
        "https://sapiensassignment-backend.onrender.com/api/users/setTheme",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ theme: theme }),
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        "https://sapiensassignment-backend.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // Handle the response data
      setTheme(themes[response.data.theme]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleChange = (selectedTheme) => {
    if (selectedTheme && selectedTheme.label) {
      setTheme(themes[selectedTheme.label]);
    } else {
      setTheme(themes.default);
    }
    saveThemeInDB(selectedTheme.label);
  };

  const refCallback = (node) => {
    if (node) {
      theme &&
        Object.keys(theme).forEach((element) => {
          node.style.setProperty(element, theme[element], "important");
          if (element === "background-color" || element === "background") {
            // apply the same background mentioned for theme to the body of the website
            document.body.style.background = theme[element];
          }
        });
    }
  };

  return (
    <div ref={refCallback} className="main-section">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage handleChange={handleChange} />}
          ></Route>
          <Route
            path="/homePage"
            element={<HomePage handleChange={handleChange} />}
          ></Route>
          <Route
            path="/login"
            element={
              <LoginPage setToken={setToken} handleChange={handleChange} />
            }
          ></Route>
          <Route
            path="/signUp"
            element={<SignupPage handleChange={handleChange} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
