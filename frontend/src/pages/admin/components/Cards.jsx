import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const Cards = () => {
  const [allUsers, setAllUsers] = useState("");
  const [allBooks, setAllBooks] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`)
    ])
      .then(([userResponse, bookResponse, transactionResponse]) => {
        setAllUsers(userResponse.data.totalUsers);
        setAllBooks(bookResponse.data.totalBooks);
        setTransactions(transactionResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })

  }, []);

  const borrowedBooks = transactions.filter(transaction => transaction.transactionType === 'borrowed').length;
  return (
    <div className='position-fixed top-50 translate-middle p-10' style={{ left: '65%' }}>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card text-bg-success mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-center">Total Users</div>
            <div className="card-body">
              {loading ? (<div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>)
                : (<h5 className="card-title text-center">{allUsers}</h5>)}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-bg-success mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-center">Total Books</div>
            <div className="card-body">
              {loading ? (<div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>) : (<h5 className="card-title text-center">{allBooks}</h5>)}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-bg-success mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-center">Borrowed Books</div>
            <div className="card-body">
              {loading ? (<div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>) :
                (<h5 className="card-title text-center">{borrowedBooks}</h5>)
              }
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-bg-success mb-3" style={{ maxWidth: "30rem" }}>
            <div className="card-header text-center">Available Books</div>
            <div className="card-body">
              {loading ? (<div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>) :
                (<h5 className="card-title text-center">{allBooks - borrowedBooks}</h5>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
