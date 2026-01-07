import React from 'react';

const About = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h2 className="mb-4">About TaskFlow</h2>
                    <p className="text-muted fs-5">
                        This application is designed to simplify workforce management. 
                        It allows HR administrators to handle employee onboarding and task distribution efficiently.
                        Employees get a clear view of their responsibilities and deadlines.
                    </p>
                    <hr className="my-5"/>
                    <div className="text-start">
                        <h4>Tech Stack</h4>
                        <ul className="list-unstyled mt-3 text-secondary">
                            <li className="mb-2">✓ React.js (Vite) Frontend</li>
                            <li className="mb-2">✓ Node.js & Express Backend</li>
                            <li className="mb-2">✓ MongoDB Database</li>
                            <li className="mb-2">✓ Bootstrap 5 Styling</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;