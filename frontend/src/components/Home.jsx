import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';  
const Home = () => {
    return (
        <div className="container py-5">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold text-dark mb-3">Manage Teams <br/><span className="text-primary">Effortlessly.</span></h1>
                    <p className="lead text-secondary mb-4">
                        A clean, minimalistic platform for HR to assign tasks and employees to track progress. No clutter, just productivity.
                    </p>
                    <div className="d-flex gap-3">
                        <Link to="/about" className="btn btn-outline-dark btn-lg">Learn More</Link>
                        <Link to="/register" className="btn btn-outline-primary btn-lg">Register Company</Link>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1">
                    
                    <Login />
                </div>
            </div>
            
            <div className="row mt-5 pt-5 text-center">
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">Task Tracking</h3>
                        <p className="text-muted small">Assign deadlines and track completion status in real-time.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">Employee Mgmt</h3>
                        <p className="text-muted small">Easily onboard employees and manage their roles securely.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">SaaS Ready</h3>
                        <p className="text-muted small">Built for multiple organizations to operate independently.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;