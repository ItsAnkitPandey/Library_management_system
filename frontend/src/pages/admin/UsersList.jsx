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
            .get(`${process.env.BACKEND_URL}/user`)
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
            <div className=' d-flex justify-content-center align-items-center flex-wrap' style={{ height: "90vh", marginLeft:"100px" }}>
                {loading ? (
                    <Spinner2 />
                ) : (
                    <div >
                        <table className="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">S. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(( user, index) => (
                                    <tr key={user._id}>
                                        <td>{index+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersList
