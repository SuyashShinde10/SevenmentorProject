import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const EmpDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (!user || user.role !== 'employee') navigate('/');
        else axios.get(`http://localhost:8000/api/task/emp/${user.id}`).then(res => setTasks(res.data));
    }, [user, navigate]);

    useEffect(() => setCurrentPage(1), [search]);

    const updateStatus = (taskId, newStatus) => {
        axios.put(`http://localhost:8000/api/task/status/${taskId}`, { status: newStatus })
            .then(() => setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t)));
    };

    // --- DATE FORMATTER (D/M/YYYY) ---
    // This ensures it looks like "7/1/2026" to match your HR Dashboard
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    const indexOfLast = currentPage * itemsPerPage;
    const currentTasks = filteredTasks.slice(indexOfLast - itemsPerPage, indexOfLast);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-light">Welcome back, <span className="fw-bold">{user?.name}</span></h2>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold m-0">Assigned Tasks</h5>
                        <input className="form-control form-control-sm w-25 bg-light border-0" placeholder="Search tasks..." onChange={e => setSearch(e.target.value)} />
                    </div>
                    
                    {filteredTasks.length === 0 ? <p className="text-muted text-center py-4">No tasks found.</p> : (
                        <>
                            <div className="table-responsive">
                                <table className="table align-middle table-hover">
                                    <thead className="text-muted small text-uppercase">
                                        <tr>
                                            <th style={{width: "35%"}}>Task Details</th>
                                            <th style={{width: "25%"}}>Dates</th>
                                            <th style={{width: "15%"}}>Status</th>
                                            <th style={{width: "25%"}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {currentTasks.map(task => (
                                            <tr key={task._id}>
                                                <td>
                                                    <div className="fw-bold text-dark">{task.title}</div>
                                                    <div className="text-muted small">{task.description}</div>
                                                </td>
                                                
                                                {/* --- DATES COLUMN (Updated Format) --- */}
                                                <td className="small">
                                                    <div className="text-muted">
                                                        Assigned: <span className="text-dark">
                                                            {formatDate(task.assignedDate)}
                                                        </span>
                                                    </div>
                                                    <div className="text-muted">
                                                        Deadline: <span className={new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'text-danger fw-bold' : 'text-danger'}>
                                                            {formatDate(task.deadline)}
                                                        </span>
                                                    </div>
                                                    {task.status === 'Completed' && task.completedAt && (
                                                        <div className="text-success fw-bold">
                                                            Done: {formatDate(task.completedAt)}
                                                        </div>
                                                    )}
                                                </td>

                                                <td>
                                                    <span className={`badge rounded-pill ${task.status === 'Completed' ? 'bg-success-subtle text-success' : task.status === 'Accepted' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {task.status === 'Pending' && <button className="btn btn-sm btn-outline-dark" onClick={() => updateStatus(task._id, 'Accepted')}>Accept</button>}
                                                    {task.status === 'Accepted' && <button className="btn btn-sm btn-success" onClick={() => updateStatus(task._id, 'Completed')}>Mark Done</button>}
                                                    {task.status === 'Completed' && <span className="text-muted small"><i className="bi bi-check-circle-fill text-success"></i> Done</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination itemsPerPage={itemsPerPage} totalItems={filteredTasks.length} paginate={setCurrentPage} currentPage={currentPage} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmpDashboard;