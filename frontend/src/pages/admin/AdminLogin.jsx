import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Navbar from '../../components/Navbar'

const AdminLogin = ({onlogin}) => {
  const naviagte = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password
    }
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, data) 
      .then((res) => {
        if (res.data.success === true) {
          onlogin();
          localStorage.setItem('authtoken', res.data.authtoken );
          naviagte('/adminDashboard')
          setLoading(false);
          enqueueSnackbar('Successfully logged in', { variant: 'success' })
        }

      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            enqueueSnackbar('Admin Not Found!', { variant: 'warning' });
          } else if (error.response.status === 401) {
            enqueueSnackbar('Incorrect Password', { variant: 'error' });
          }
        } else {
          // Handle non-HTTP errors here, if needed
          enqueueSnackbar('An error occurred', { variant: 'error' });
        }
        setLoginError(true);
        setLoading(false);
        console.log(error.response);
      });
  }
  return (
    <>
    <Navbar />
      <div className='container bg-light d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
        <form className='border border-success rounded p-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="username" value={username} onChange={handleUsernameChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handlePasswordChange} minLength={5} required />
            {loginError && <p style={{ color: 'red' }}>Invalid credentials. Please try again.</p>}
          </div>
          {loading ? (<Spinner />) : (<button type="submit" className="btn btn-success">Login as Admin</button>)}
        </form>

      </div>
    </>
  )
}

export default AdminLogin
