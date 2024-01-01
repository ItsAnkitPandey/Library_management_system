import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
const Home = () => {

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh", backgroundImage: "url()" }}>
        <div className="row" >
          <div className="col-sm-6 mb-3 mb-sm-0 w-50 h-50 ">
            <div className="card text-bg-primary">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrAHUk4SpZ98Ihj5Dp9ps6Qtp4EWL5ly0iw5M-YDiww&s" className="card-img-top" alt="User" />
              <div className="card-body d-flex justify-content-center align-items-center flex-column" style={{ width: "200px" }}>
                <h5 className="card-title">Login as User</h5>
                <Link to="/userLogin" className="btn btn-light">Login</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6  mb-3 mb-sm-0 w-50 h-50">
            <div className="card text-bg-success">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZTB7uKrD-9rKPOB26QrFOP7TcqLQllfsl8UtnVXaEA&s" className="card-img-top" alt="Admin" />
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h5 className="card-title">Login as Admin</h5>
                <Link to="/adminLogin" className="btn btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
