import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Sidebar from './components/Sidebar';


const AdminRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const adminData = {
      email,
      username,
      phone,
      name,
      password,
      role: 'Admin'
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admin/register`, adminData)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar('Admin Registered Successfully.', { variant: 'success' });
        navigate('/adminDashboard');
        console.log(res)
      })
      .catch((error, res) => {
        setLoading(false);
        console.log(res);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.error;
    
          // Check for specific error messages and show alert messages accordingly
          if (errorMessage.includes('admin with same email exist')) {
            enqueueSnackbar('Admin with the same email already exists.', { variant: 'error' });
          } else if (errorMessage.includes('admin with same username exist')) {
            enqueueSnackbar('Admin with the same username already exists.', { variant: 'error' });
          } else {
            enqueueSnackbar('Some error occurred during registration.', { variant: 'error' });
          }
        } else {
          enqueueSnackbar('Some error occurred during registration.', { variant: 'error' });
        }
      });
      
  };
  return (
    <>
      <Sidebar />
      <div className='container d-flex justify-content-center align-items-center position-absolute' style={{ height: "90vh", top: '5%', left: "15%" }}>
        <form className='border border-info rounded p-4 m-5' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Userame</label>
            <input type="text" className="form-control" id="username" aria-describedby="username" name='username' value={username} onChange={handleUsernameChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="name" name='name' value={name} onChange={handleNameChange} minLength={3} required />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" name='email' value={email} onChange={handleEmailChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={password} onChange={handlePasswordChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Mobile No.</label>
            <input type='number' className="form-control" name='phone' id="phone" value={phone} onChange={handlePhoneChange} pattern='\d{10}'  required />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <input type="text" className="form-control" disabled name='role' id="role" value='Admin' minLength={5} required />
          </div>
          {loading ? (<Spinner />) : (<button type="submit" className="btn btn-primary">Register</button>)}
        </form>

      </div>

    </>
  )
}

export default AdminRegister
