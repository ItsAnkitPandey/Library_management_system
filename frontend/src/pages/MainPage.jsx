import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Spinner2 from '../components/Spinner2';
import { jwtDecode } from 'jwt-decode';
import TransactionHistory from './TransactionHistory';


const MainPage = ({ userLogout }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleReturnBook = (bookId) => {
    const token = localStorage.getItem('userAuthtoken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.id;

    setLoading(true);

    // Check if the user has borrowed the book
    axios
      .get(`http://localhost:8080/users/${userId}/transactions`, {
        headers: {
          'authtoken': token
        }
      })
      .then((response) => {
        const borrowedBooks = response.data;
        const hasBorrowedBook = borrowedBooks.some(transaction => 
          transaction.book._id === bookId && transaction.transactionType === 'borrowed'
        );

        if (hasBorrowedBook) {
          // User has borrowed the book, proceed with returning
          axios
            .put(`http://localhost:8080/users/${userId}/transactions/${bookId}`, {},
              {
                headers: {
                  'authtoken': token
                },
              }
            )
            .then(() => {
              enqueueSnackbar('Book returned successfully!', { variant: 'success' });
              window.location.reload();
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              enqueueSnackbar('An error occurred while returning the book.');
            });
        } else {
          // User hasn't borrowed the book, show an error message
          setLoading(false);
          enqueueSnackbar('You have not borrowed this book.', { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('An error occurred while checking borrowed books.');
      });
  };

  const handleBorrowBook = (bookId) => {
    const token = localStorage.getItem('userAuthtoken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.id;

    setLoading(true);
    axios
      .post(`http://localhost:8080/users/${userId}/transactions`, { bookId }, {
        headers: {
          'authtoken': token
        }
      })
      .then(() => {
        // Assuming the backend returns the updated list of books after borrowing
        enqueueSnackbar('Book borrowed successfully!', { variant: 'success' });
        window.location.reload();
        setLoading(false);
        navigate('/mainPage')

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('An error occurred while borrowing the book.');
      });
  };

  

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/book/')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('An error occured!');
      });

  }, []);


  return (
    <div>
      <Navbar userLogout={userLogout} />
      <div className=' d-flex justify-content-center align-items-center flex-wrap m-4' >
        {
          loading ? (<Spinner2 />) :
            (
              books.map((book) => (
                <div key={book._id} className="card m-2" style={{ width: "15rem", height: "30rem" }}>
                  <img src={book.imgUrl} className="card-img-top" alt="preview not available " style={{ height: "200px" }} />
                  <div className="card-body">
                    <h5 className="card-title text-center">{book.title}</h5>
                    <p className="card-text text-center">Author: <span className='fw-bold'>{book.author}</span></p>
                    <p className="card-text text-center">Publish Year : <span className="fw-bold">{book.publishYear.slice(0, 4)}</span></p>
                    <div className="d-flex align-items-center justify-content-between">
                      {book.availabilityStatus ? (
                        <button onClick={() => handleBorrowBook(book._id)} className="btn btn-primary m-2">
                          Borrow
                        </button>
                      ) : (
                        <button className="btn btn-danger m-2" disabled>
                          Not Available
                        </button>
                      )}
                      <button onClick={() => handleReturnBook(book._id)} className="btn btn-warning m-2">
                        Return
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
        }
      </div>
      <TransactionHistory  />
    </div>
  )
}

export default MainPage
