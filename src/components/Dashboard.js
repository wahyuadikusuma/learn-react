import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Navbar from './Navbar';


function Dashboard() {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() => {
            refreshToken();
            getUser();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            console.log("error refreshing token..");
        }
    }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axiosJWT.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUser = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/users',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);            
        }
    }

    return (
        <>
        <Navbar/>
        <section className='section'>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard, { name }!</p>
            <button onClick={getUser} className='button is-info'>Get User</button>
            <div>
                <h2>User Information</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ name }</td>
                            <td>{ name }</td>
                            <td>user@example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        </>
    );
}

export default Dashboard;
