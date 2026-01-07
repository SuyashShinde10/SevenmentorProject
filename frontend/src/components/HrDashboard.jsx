import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const HrDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Data
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]); 
    
    // Search
    const [searchEmp, setSearchEmp] = useState("");
    const [searchTask, setSearchTask] = useState("");
    const [searchSelectEmp, setSearchSelectEmp] = useState("");

    // Pagination
    const [currPageEmp, setCurrPageEmp] = useState(1);
    const [currPageSelect, setCurrPageSelect] = useState(1);
    const [currPageTask, setCurrPageTask] = useState(1);
    const itemsPerPage = 5;

    // Forms
    const [empData, setEmpData] = useState({ name: '', email: '', password: '', designation: '' });
    const [taskData, setTaskData] = useState({ title: '', description: '', assignedTo: [], deadline: '' });
    const [editingEmpId, setEditingEmpId] = useState(null);

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (!user || user.role !== 'hr') navigate('/');
        else { getEmployees(); getTasks(); }
    }, [user, navigate]);

    useEffect(() => setCurrPageEmp(1), [searchEmp]);
    useEffect(() => setCurrPageTask(1), [searchTask]);
    useEffect(() => setCurrPageSelect(1), [searchSelectEmp]);

    const getEmployees = () => axios.get(`http://localhost:8000/api/emp/list/${user.id}`).then(res => setEmployees(res.data));
    const getTasks = () => axios.get(`http://localhost:8000/api/task/hr/${user.id}`).then(res => setTasks(res.data));

    // CRUD Functions
    const submitEmp = (e) => {
        e.preventDefault();
        const url = editingEmpId ? `http://localhost:8000/api/emp/update/${editingEmpId}` : `http://localhost:8000/api/emp/create`;
        const method = editingEmpId ? axios.put : axios.post;
        const payload = editingEmpId ? empData : { ...empData, hrId: user.id };
        method(url, payload).then(() => { getEmployees(); resetEmpForm(); alert(editingEmpId ? "Updated" : "Created"); });
    };
    const deleteEmp = (id) => { if(window.confirm("Delete?")) axios.delete(`http://localhost:8000/api/emp/delete/${id}`).then(() => getEmployees()); };
    const editEmp = (emp) => { setEmpData(emp); setEditingEmpId(emp._id); };
    const resetEmpForm = () => { setEmpData({ name: '', email: '', password: '', designation: '' }); setEditingEmpId(null); };

    const handleCheckboxChange = (empId) => {
        setTaskData(prev => {
            const isSelected = prev.assignedTo.includes(empId);
            return isSelected ? { ...prev, assignedTo: prev.assignedTo.filter(id => id !== empId) } : { ...prev, assignedTo: [...prev.assignedTo, empId] };
        });
    };
    const submitTask = (e) => {
        e.preventDefault();
        if(taskData.assignedTo.length === 0) return alert("Select Employee");
        axios.post(`http://localhost:8000/api/task/assign`, { ...taskData, createdBy: user.id }).then(() => { getTasks(); resetTaskForm(); alert("Assigned"); });
    };
    const deleteTask = (id) => { if(window.confirm("Delete task?")) axios.delete(`http://localhost:8000/api/task/delete/${id}`).then(() => getTasks()); };
    const resetTaskForm = () => { setTaskData({ title: '', description: '', assignedTo: [], deadline: '' }); };

    // --- DATA PROCESSING ---
    const filteredEmployees = employees.filter(e => e.name.toLowerCase().includes(searchEmp.toLowerCase()));
    const idxLastEmp = currPageEmp * itemsPerPage;
    const currentEmployees = filteredEmployees.slice(idxLastEmp - itemsPerPage, idxLastEmp);

    const filteredSelectEmps = employees.filter(e => e.name.toLowerCase().includes(searchSelectEmp.toLowerCase()));
    const idxLastSelect = currPageSelect * itemsPerPage;
    const currentSelectEmps = filteredSelectEmps.slice(idxLastSelect - itemsPerPage, idxLastSelect);

    const groupedTasks = tasks.reduce((acc, task) => {
        const gid = task.groupId || task._id;
        if (!acc[gid]) acc[gid] = { ...task, assignees: [], totalStatus: [] };
        acc[gid].assignees.push({ name: task.assignedTo?.name || "Unknown", status: task.status, id: task._id, completedAt: task.completedAt });
        acc[gid].totalStatus.push(task.status);
        return acc;
    }, {});
    const groupedTaskList = Object.values(groupedTasks).filter(t => t.title.toLowerCase().includes(searchTask.toLowerCase()));
    const idxLastTask = currPageTask * itemsPerPage;
    const currentTasks = groupedTaskList.slice(idxLastTask - itemsPerPage, idxLastTask);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-light">Dashboard <span className="text-muted fs-5">/ {user?.name}</span></h2>

            <div className="row g-4">
                {/* --- LEFT COL --- */}
                <div className="col-lg-4">
                    {/* Add Employee Form */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">{editingEmpId ? "Edit Employee" : "New Employee"}</h5>
                            <form onSubmit={submitEmp}>
                                <input className="form-control bg-light border-0 mb-2" placeholder="Name" value={empData.name} onChange={e => setEmpData({...empData, name: e.target.value})} required />
                                <input className="form-control bg-light border-0 mb-2" placeholder="Email" value={empData.email} onChange={e => setEmpData({...empData, email: e.target.value})} required />
                                {!editingEmpId && <input className="form-control bg-light border-0 mb-2" placeholder="Password" value={empData.password} onChange={e => setEmpData({...empData, password: e.target.value})} required />}
                                <input className="form-control bg-light border-0 mb-3" placeholder="Designation" value={empData.designation} onChange={e => setEmpData({...empData, designation: e.target.value})} required />
                                <div className="d-flex gap-2">
                                    <button className="btn btn-dark w-100">{editingEmpId ? "Save" : "Add"}</button>
                                    {editingEmpId && <button type="button" className="btn btn-light" onClick={resetEmpForm}>Cancel</button>}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Employee List */}
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="p-3 border-bottom">
                                <h6 className="fw-bold mb-2">Employees</h6>
                                <input className="form-control form-control-sm" placeholder="Search..." onChange={e => setSearchEmp(e.target.value)} />
                            </div>
                            <div className="list-group list-group-flush">
                                {currentEmployees.map(emp => (
                                    <div className="list-group-item border-0 border-bottom d-flex justify-content-between align-items-center py-3" key={emp._id}>
                                        <div>
                                            <div className="fw-bold text-dark">{emp.name}</div>
                                            <small className="text-muted">{emp.designation}</small>
                                        </div>
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-light text-primary" onClick={() => editEmp(emp)}><i className="bi bi-pencil-fill"></i></button>
                                            <button className="btn btn-sm btn-light text-danger" onClick={() => deleteEmp(emp._id)}><i className="bi bi-trash-fill"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-top bg-light">
                                <Pagination itemsPerPage={itemsPerPage} totalItems={filteredEmployees.length} paginate={setCurrPageEmp} currentPage={currPageEmp} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COL --- */}
                <div className="col-lg-8">
                    {/* Assign Task Form */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Assign Group Task</h5>
                            <form onSubmit={submitTask}>
                                <div className="row g-2">
                                    <div className="col-md-6"><input className="form-control bg-light border-0" placeholder="Title" value={taskData.title} onChange={e => setTaskData({...taskData, title: e.target.value})} required /></div>
                                    <div className="col-md-6"><input type="date" className="form-control bg-light border-0" min={getTodayDate()} value={taskData.deadline} onChange={e => setTaskData({...taskData, deadline: e.target.value})} required /></div>
                                    <div className="col-12 mt-3">
                                        <div className="d-flex justify-content-between align-items-end mb-2">
                                            <label className="form-label small fw-bold text-muted m-0">ASSIGN TEAM:</label>
                                            <input className="form-control form-control-sm w-50" placeholder="Filter employees..." onChange={e => setSearchSelectEmp(e.target.value)} />
                                        </div>
                                        <div className="border rounded p-2 bg-light">
                                            {currentSelectEmps.map(emp => (
                                                <div className="form-check" key={emp._id}>
                                                    <input className="form-check-input" type="checkbox" value={emp._id} id={`emp-${emp._id}`} checked={taskData.assignedTo.includes(emp._id)} onChange={() => handleCheckboxChange(emp._id)} />
                                                    <label className="form-check-label small" htmlFor={`emp-${emp._id}`}>{emp.name} <span className="text-muted">({emp.designation})</span></label>
                                                </div>
                                            ))}
                                        </div>
                                        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredSelectEmps.length} paginate={setCurrPageSelect} currentPage={currPageSelect} />
                                    </div>
                                    <div className="col-12 mt-2"><textarea className="form-control bg-light border-0" placeholder="Description..." value={taskData.description} onChange={e => setTaskData({...taskData, description: e.target.value})} required rows="2"></textarea></div>
                                </div>
                                <button className="btn btn-primary px-4 mt-3">Assign to Team</button>
                            </form>
                        </div>
                    </div>

                    {/* Task Progress Table (UPDATED) */}
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold m-0">Task Progress</h5>
                                <input className="form-control form-control-sm w-25" placeholder="Search..." onChange={e => setSearchTask(e.target.value)} />
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead className="table-light text-muted small text-uppercase">
                                        <tr>
                                            <th>Task Info</th>
                                            <th>Dates</th>
                                            <th>Team Progress</th>
                                            <th>Status</th>
                                            <th>Act</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {currentTasks.map((group, index) => {
                                            const isAllComplete = group.totalStatus.every(status => status === 'Completed');
                                            const completedCount = group.totalStatus.filter(s => s === 'Completed').length;
                                            
                                            // Handle dates safely
                                            const assigned = group.assignedDate ? new Date(group.assignedDate).toLocaleDateString() : '-';
                                            const deadline = new Date(group.deadline).toLocaleDateString();
                                            // Last completion date in the group (optional logic)
                                            const lastComplete = group.assignees
                                                .map(a => a.completedAt ? new Date(a.completedAt) : 0)
                                                .sort((a,b) => b-a)[0]; // max date
                                            const completedOn = isAllComplete && lastComplete ? new Date(lastComplete).toLocaleDateString() : '-';

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="fw-bold text-dark">{group.title}</div>
                                                    </td>
                                                    <td className="small">
                                                        <div className="text-muted">Assigned: <span className="text-dark">{assigned}</span></div>
                                                        <div className="text-muted">Deadline: <span className="text-danger">{deadline}</span></div>
                                                        {isAllComplete && <div className="text-success fw-bold">Done: {completedOn}</div>}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {group.assignees.map(a => (
                                                                <span key={a.id} className={`badge border ${a.status === 'Completed' ? 'bg-success-subtle text-success border-success' : 'bg-light text-muted'}`} title={a.name}>
                                                                    {a.name.split(' ')[0]} {a.status === 'Completed' && <i className="bi bi-check"></i>}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <small className="text-muted" style={{fontSize: '0.75rem'}}>{completedCount} / {group.totalStatus.length} Done</small>
                                                    </td>
                                                    <td>{isAllComplete ? <span className="badge bg-success rounded-pill px-3">COMPLETED</span> : <span className="badge bg-warning text-dark rounded-pill px-3">IN PROGRESS</span>}</td>
                                                    <td>
                                                        {group.assignees.map(t => (
                                                            <button key={t.id} className="btn btn-link text-danger p-0 ms-1" onClick={() => deleteTask(t.id)}><i className="bi bi-x-circle"></i></button>
                                                        ))}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-top pt-2">
                                <Pagination itemsPerPage={itemsPerPage} totalItems={groupedTaskList.length} paginate={setCurrPageTask} currentPage={currPageTask} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrDashboard;