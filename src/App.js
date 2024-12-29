import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import RecipeManagement from "./components/RecipeManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/recipes" element={<RecipeManagement />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
