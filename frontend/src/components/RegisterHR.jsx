import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterHR = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ companyName: '', email: '', password: '' });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/auth/register-hr', formData);
            alert("Registration Success! Please Login.");
            navigate('/');
        } catch (err) {
            alert("Error: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-5">
                            <h3 className="text-center mb-4 fw-bold">Create Account</h3>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted small fw-bold">COMPANY NAME</label>
                                    <input className="form-control bg-light border-0" onChange={e => setFormData({...formData, companyName: e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small fw-bold">EMAIL ADDRESS</label>
                                    <input type="email" className="form-control bg-light border-0" onChange={e => setFormData({...formData, email: e.target.value})} required />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted small fw-bold">PASSWORD</label>
                                    <input type="password" className="form-control bg-light border-0" onChange={e => setFormData({...formData, password: e.target.value})} required />
                                </div>
                                <button className="btn btn-primary w-100 py-2">Register Company</button>
                            </form>
                            <p className="mt-4 text-center small">
                                Already registered? <a href="/" className="fw-bold text-decoration-none">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterHR;