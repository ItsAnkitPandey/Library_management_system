import axios from 'axios'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaUser, FaChartBar, FaUserCircle, FaClipboardList, FaExchangeAlt  } from 'react-icons/fa';


const Sidebar = ({ adminLogout }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    let location = useLocation();

    const handleLogout = () => {
        enqueueSnackbar('Succesfully Logout', { variant: 'error' });
        adminLogout();
        navigate('/adminLogin');
    }

    const [admin, setAdmin] = useState();

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                // Get the authentication token from localStorage
                const authToken = localStorage.getItem('authtoken');

                if (!authToken) {
                    console.error('Authentication token not found');
                    return;
                }

                // Make a request to the backend route that retrieves admin details
                axios
                    .post(`${import.meta.env.VITE_BACKEND_URL}/admin/getAdmin`, null, {
                        headers: {
                            'authtoken': authToken
                        }
                    })
                    .then((res) => {
                        setAdmin(res.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };
        fetchAdminDetails();
    }, [location]);
    return (
        <div className='d-flex '>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-25 vh-100"  >
                <Link to='/adminDashboard' className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-7 fs-md-4">Admin Dashboard</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto w-50">
                    <li className="nav-item  ">
                        <Link to="/adminDashboard" className={`nav-link text-white ${location.pathname === "/adminDashboard" ? "active" : ""}`} aria-current="page">
                            <FaChartBar className="me-2 d-inline d-md-none" /> {/* Home Icon */}
                            <span className="d-none d-md-inline">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/newbook" className={`nav-link text-white ${location.pathname === "/newbook" ? "active" : ""}`}>
                            <FaBook className="me-2 d-inline d-md-none" /> {/* Book Icon */}
                            <span className="d-none d-md-inline">Add new book</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/createAdmin" className={`nav-link text-white ${location.pathname === "/createAdmin" ? "active" : ""}`}>
                            <FaUser className="me-2 d-inline d-md-none" /> 
                            <span className="d-none d-md-inline">Add New Admin</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/manageBooks" className={`nav-link text-white ${location.pathname === "/manageBooks" ? "active" : ""}`}>
                            <FaClipboardList  className="me-2 d-inline d-md-none" />
                            <span className="d-none d-md-inline">Manage Books</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/borrowBooks" className={`nav-link text-white ${location.pathname === "/borrowRequest" ? "active" : ""}`}>
                            <FaExchangeAlt className="me-2 d-inline d-md-none" /> 
                            <span className="d-none d-md-inline">Borrowed Books</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className={`nav-link text-white ${location.pathname === "/users" ? "active" : ""}`}>
                            <FaUserCircle className="me-2 d-inline d-md-none" />
                            <span className="d-none d-md-inline">Users List</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={`nav-link text-white ${location.pathname === "/" ? "active" : ""}`}>
                            <FaHome className="me-2 d-inline d-md-none" /> {/* Home Icon */}
                            <span className="d-none d-md-inline">Homepage</span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong className='d-none d-md-inline'>{admin ? `${admin.username}` : 'username'}</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="#">Edit Profile</Link></li>
                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
