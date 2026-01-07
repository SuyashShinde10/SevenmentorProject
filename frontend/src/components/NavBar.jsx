import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm py-3">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">
                    <i className="bi bi-grid-3x3-gap-fill me-2"></i>TaskFlow SaaS
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        
                        {user ? (
                            <>
                                <li className="nav-item ms-3">
                                    <span className="badge bg-light text-dark border me-2">
                                        {user.role === 'hr' ? 'Admin' : 'Employee'}: {user.name}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item ms-2">
                                <Link className="btn btn-primary btn-sm px-4" to="/">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;