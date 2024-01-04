import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';
import Navbar from '../../components/Navbar'

const UserLogin = ({ onlogin }) => {
  const naviagte = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password
    }
    setLoading(true)
    axios
      .post(`${process.env.BACKEND_URL}/user/login`, data)
      .then((res) => {
        if (res.data.success === true) {
          onlogin();
          localStorage.setItem('userAuthtoken', res.data.authtoken);
          naviagte('/mainPage')
          setLoading(false);
          enqueueSnackbar('Successfully logged in', { variant: 'success' })
        }

      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            enqueueSnackbar('User Not Found!', { variant: 'warning' });
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
        <form className='border border-info rounded p-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={handleUsernameChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handlePasswordChange} minLength={5} required />
            {loginError && <p style={{ color: 'red' }}>Invalid credentials. Please try again.</p>}
          </div>
          {loading ? (<Spinner />) : (<button type="submit" className="btn btn-primary">Login</button>)}
          <Link to='/userRegister'><p className='m-2 '>Register</p></Link>
        </form>

      </div>
    </>
  )
}

export default UserLogin
