import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner2 from '../../components/Spinner2';
import Sidebar from './components/Sidebar';

const UsersList = () => {
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/user`)
            .then((response) => {
                setTotalUsers(response.data.totalUsers);
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })

    }, []);
    return (
        <div>
            <div className="position-fixed w-75">
                <Sidebar />
            </div>
            <div className=' d-flex justify-content-center align-items-center flex-wrap' style={{ height: "90vh", marginLeft: "100px" }}>
                {loading ? (
                    <Spinner2 />
                ) : (
                    <>
                        {users.map((user) => (
                            <div className="card m-3" style={{ width: "15rem" }}>
                                <ul key={user._id} className="list-group list-group-flush">
                                    <li className="list-group-item">User Id : {user._id}</li>
                                    <li className="list-group-item">Name: {user.name}</li>
                                    <li className="list-group-item">Email: {user.email}</li>
                                </ul>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default UsersList
