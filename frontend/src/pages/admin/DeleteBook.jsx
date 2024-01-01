import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner2 from '../../components/Spinner2';
import Sidebar from './components/Sidebar';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8080/book/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book deleted successfully.', { variant: 'success' })
                navigate('/manageBooks');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('An error occured', { variant: 'error' });
                console.log(error);
            })
    }
    return (
        <div>
            <div className="position-fixed w-75">
                <Sidebar />
            </div>
            <div className=' d-flex justify-content-md-center justify-content-end align-items-center mx-5 position-absolute' style={{ height: "90vh", left: "15%" }}>
                {loading && <Spinner2 />}
                <div className="d-flex flex-column align-items-center border border-primary rounded-3 ms-5  p-4 mx-auto" >
                    <h3 className='h4 mb-4'>Are you sure you want to delete this book?</h3>
                    <button className='btn btn-danger p-2 m-4 w-100' onClick={handleDeleteBook}>
                        Yes, Delete It
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBook
