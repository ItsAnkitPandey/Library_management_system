import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar'
import Spinner from '../../components/Spinner2'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineDelete } from "react-icons/md"

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

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
            })
    }, [])

    return (
        <div>
            <div className="position-fixed w-75">
                <Sidebar />
            </div>
            <div className=' d-flex justify-content-center align-items-center flex-wrap position-absolute ml-5' style={{ height: "90vh", top: '5%', left: "20%" }}>
                {
                    loading ? (<Spinner />) :
                        (
                            books.map((book) => (
                                <div key={book._id} className="card m-2" style={{ width: "15rem" }}>
                                    <img src={book.imgUrl} className="card-img-top" alt="preview not available " style={{ height: "200px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{book.title}</h5>
                                        <p className="card-text text-center">Author: {book.author}</p>
                                        <p className="card-text text-center">Publish Year : {book.publishYear.slice(0,4)}</p>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link to={`/books/details/${book._id}`} className=" m-2">
                                            <BsInfoCircle className='text-success fs-2 ' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`} className=" m-2">
                                            <AiOutlineEdit className='text-warning fs-2 ' />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`} className=" m-2">
                                            <MdOutlineDelete className='text-danger fs-2 ' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>

        </div>

    )
}

export default ManageBooks
