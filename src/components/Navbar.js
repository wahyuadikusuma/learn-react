import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
  return (
        <nav className="navbar is-info px-4" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
            <img src="logo.png" alt="Logo" width="112" height="28" />
            </a>
        </div>

        <div className="navbar-menu">
            <div className="navbar-end">
            <a className="navbar-item" href="/">Beranda</a>
            <a className="navbar-item" href="/kontak">Kontak</a>
            <div className="navbar-item">
                <div className="buttons">
                <button onClick={Logout} className="button is-light">Logout</button>
                </div>
            </div>
            </div>
        </div>
        </nav>

  );
}

export default Navbar;
