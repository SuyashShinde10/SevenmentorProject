import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '', role: 'hr' });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', formData);
            if (res.data.success) {
                login(res.data);
                if (res.data.role === 'hr') navigate('/hr-dashboard');
                else navigate('/emp-dashboard');
            }
        } catch (err) {
            alert("Login Failed: " + (err.response?.data?.message || "Error"));
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
                <h4 className="text-center mb-4 fw-bold">Login</h4>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label text-muted small fw-bold">SELECT ROLE</label>
                        <select className="form-select bg-light border-0" onChange={(e) => setFormData({...formData, role: e.target.value})}>
                            <option value="hr">HR (Admin)</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted small fw-bold">EMAIL ADDRESS</label>
                        <input className="form-control bg-light border-0" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-muted small fw-bold">PASSWORD</label>
                        <input className="form-control bg-light border-0" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <button className="btn btn-primary w-100 py-2">Sign In</button>
                </form>
                <div className="mt-4 text-center">
                    <small className="text-muted">Don't have a company account?</small><br/>
                    <a href="/register" className="text-decoration-none fw-bold">Register as HR</a>
                </div>
            </div>
        </div>
    );
};

export default Login;