import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Navbar from '../../components/Navbar';

const UserRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email,
      name,
      password
    };
    setLoading(true);
    axios
      .post('http://localhost:8080/user/register', userData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User Registered Successfully.', { variant: 'success' });
        navigate('/UserLogin');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.error;
    
          // Check for specific error message and show an alert message accordingly
          if (errorMessage.includes('user with same email exist')) {
            enqueueSnackbar('A user with the same email already exists.', { variant: 'error' });
          } else {
            enqueueSnackbar('Some error occurred during registration.', { variant: 'error' });
          }
        } else {
          enqueueSnackbar('Some error occurred during registration.', { variant: 'error' });
        }
      })
  };
  return (
    <div>
      <Navbar />
      <div className='container bg-light d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
        <form className='border border-info rounded p-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" id="name" aria-describedby="name" name='name' value={name} onChange={handleNameChange} minLength={3} required />

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
          {loading ? (<Spinner />) : (<button type="submit" className="btn btn-primary">Register</button>)}
          <Link to='/userLogin'><p className='m-2 '>Login</p></Link>
        </form>

      </div>
    </div>
  )
}

export default UserRegister
