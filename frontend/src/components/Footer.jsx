import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-top py-4 mt-5">
            <div className="container text-center text-muted">
                <small>&copy; {new Date().getFullYear()} TaskFlow SaaS. All rights reserved.</small>
                <div className="mt-2">
                    <span className="mx-2">Privacy</span>
                    <span className="mx-2">Terms</span>
                    <span className="mx-2">Support</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;