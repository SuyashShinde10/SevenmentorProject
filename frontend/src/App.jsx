import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import RegisterHR from './components/RegisterHR';
import HrDashboard from './components/HrDashboard';
import EmpDashboard from './components/EmpDashboard';

 
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div id="root">
          <NavBar />
          <div className="content-wrap">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterHR />} />
                <Route path="/hr-dashboard" element={<HrDashboard />} />
                <Route path="/emp-dashboard" element={<EmpDashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;