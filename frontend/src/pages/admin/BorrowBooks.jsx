import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner2 from '../../components/Spinner2';
import Sidebar from './components/Sidebar';
import { format } from 'date-fns'

const BorrowBooks = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDueDate = (dueDate) => {
    // Use date-fns or any other library to format the due date
    const formattedDate = format(new Date(dueDate), 'dd-MM-yyyy');

    return formattedDate;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/transactions`)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="position-fixed w-75">
        <Sidebar />
      </div>
      <div className='d-flex justify-content-center align-items-center ms-md-0 ms-5 flex-wrap' style={{ height: "90vh" }}>
        {loading ? (
          <Spinner2 />
        ) : (
          transactions.length > 0 ? (<div>
            <h2 className="mb-4 text-danger text-center">Transaction List</h2>

            {transactions.map((transaction, index) => (
              <div className="card bg-dark m-3" key={transaction._id} style={{ width: "15rem" }}>
                <div className="card-body">
                  <h5 className="card-title text-center text-light">SN: {index + 1}</h5>
                  <h3 className="card-text text-center text-primary fw-bold">{transaction.book.title}</h3><h3/>
                  <p className="card-text text-center text-light">Borrowed by {transaction.user.name}</p>
                  <p className="card-text text-center text-warning">Due Date: {formatDueDate(transaction.dueDate)}</p>
                  <p className={`card-text text-center ${transaction.transactionType === 'borrowed' ? 'text-danger' : 'text-success'}`}>Current Status: {transaction.transactionType}</p>
                </div>
              </div>
            ))}

          </div>) :
            (
              <h2 className='text-center' >No Transactions Found</h2>
            )
        )}
      </div>
    </div>
  );
};

export default BorrowBooks;
