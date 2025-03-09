import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import Expenses from "./components/Expenses";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

const AppWrapper = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <div className={currentTheme === "dark" ? "dark-theme" : ""}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;