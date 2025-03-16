import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {CardHeader, CardTitle} from "@/components/ui/card.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/token/', { username, password });
            localStorage.setItem('token', res.data.access);
            navigate('/mapping');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center pt-52">
            <div className="w-full max-w-sm">
                <CardHeader className="px-0 pb-4">
                    <CardTitle className="text-3xl font-bold text-blue-700">ECS Mapping</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-[30%]">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
