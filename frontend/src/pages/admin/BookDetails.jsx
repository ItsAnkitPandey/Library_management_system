import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar'

const BookDetails = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${process.env.BACKEND_URL}/book/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                enqueueSnackbar('An error occured!');
            })
    })

    return (
        <div>
            <div className="position-fixed w-75">
                <Sidebar />
            </div>
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className=' d-flex justify-content-md-center justify-content-end align-items-center mx-5' style={{ height: "90vh" }}>
                        <div className="card" style={{ width: "15rem" }}>
                            <img src={book.imgUrl} className="card-img-top" alt="preview not available " style={{ height: "200px" }} />
                            <div className="card-body">
                                <h5 className="card-title text-center">Book Name: <span className='fw-bold'>{book.title}</span></h5>
                                <p className="card-text text-center">Author: <span className='fw-bold'>{book.author}</span></p>
                                <p className="card-text text-center">Publish Date: <span className='fw-bold'>{book.publishYear}</span></p>
                                <Link to={`/books/delete/${book._id}`} className="btn btn-danger m-2">Delete</Link>
                                <Link to={`/books/edit/${book._id}`}className="btn btn-warning m-2">Edit</Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BookDetails
