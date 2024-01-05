import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner2 from '../../components/Spinner2';
import Sidebar from './components/Sidebar';

const BorrowBooks = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

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
         transactions.length > 0 ? ( <div>
            <h2 className="mb-4">Transaction List</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>User</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td>{index + 1}</td>
                    <td>{transaction.book.title}</td>
                    <td>{transaction.user.name}</td>
                    <td>{transaction.transactionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
