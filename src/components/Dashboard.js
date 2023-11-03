import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [name, setName] = useState('');
    const [user, setUser] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();


    const refreshToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
            setLoggedIn(true); 
        } catch (error) {
            setLoggedIn(false); 
        }
    }, [navigate]);

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axiosJWT.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUser = useCallback(async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [axiosJWT, token]);

    useEffect(() => {
        refreshToken();
        if (!loggedIn) {
            return navigate('/login', { state: { message: "Anda harus login terlebih dahulu!" } });
        }
    }, [refreshToken, loggedIn]);

    return (
        <>
            <Navbar />
            <section className='section'>
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard, {name}!</p>
                <button onClick={getUser} className='button is-info'>Get User</button>
                <div>
                    <h2>User Information</h2>
                    <table className='table is-striped is-fullwidth'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((userData, index) => (
                                <tr key={userData.id}>
                                    <td>{index + 1}</td>
                                    <td>{userData.name}</td>
                                    <td>{userData.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    );
}

export default Dashboard;
