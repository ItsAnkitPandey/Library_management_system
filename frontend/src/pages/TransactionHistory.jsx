import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('userAuthtoken')

  const getCurrentUserId = () => {
    const token = localStorage.getItem('userAuthtoken');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.user.id;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUserId = getCurrentUserId();
      setUserId(currentUserId);
  
      try {
        const response = await axios.get(`http://localhost:8080/users/${currentUserId}/transactions`, {
          headers: {
            'authtoken': token
          }
        });
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
    <h2 className="mb-4">Transaction History</h2>
    <ul className="list-group">
      {transactions.map((transaction) => (
        <li key={transaction._id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{transaction.book.title}</strong>
              <br />
              {transaction.transactionType === 'borrowed' ? (
                <span className="badge bg-primary">Borrowed</span>
              ) : (
                <span className="badge bg-warning text-dark">Returned</span>
              )}
            </div>
            <div>
              <small>Due Date: {new Date(transaction.dueDate).toLocaleDateString()}</small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default TransactionHistory;
