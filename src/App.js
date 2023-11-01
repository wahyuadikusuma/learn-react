import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

function App() {
  return (
    <Router>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Routes>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Routes>
    </Router>
  );
}

export default App;
