import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    await axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    }).then(() => {
      navigate('/dashboard');
    }, (error) => {
      setMsg(error.response.data.msg);
    });
  }

  return (
    <section className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h1 className="title has-text-centered">Login</h1>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="help is-danger">{msg}</p>
            </div>
            <div className="field is-grouped is-justify-content-center">
              <div className="control">
                <button className="button is-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="control">
                <Link to="/signup" className="button is-link">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Login;