import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Sidebar from './components/Sidebar'


const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };
    const handleDateChange = (event) => {
        setPublishYear(event.target.value);
    };

    const handleImgUrlChange = (event) => {
        setImgUrl(event.target.value)
    };

    const handleAvailabilityStatusChange = (event) => {
        setAvailabilityStatus(event.target.checked);
    };

    const handleSaveBook = async (event) => {
        event.preventDefault();
        const bookData = {
            title,
            author,
            publishYear,
            imgUrl,
            availabilityStatus
        };
        setLoading(true);
        axios
            .post('http://localhost:8080/book/create', bookData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book created successfully!', { variant: 'success' });
                navigate('/newBook')
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('All fields are required.', { variant: 'error' });
                console.log(error);
            })
    }
    return (
        <div className='position-fixed w-100' >
            <Sidebar />
            <div className='container d-flex justify-content-center align-items-center position-absolute' style={{ height: "90vh", top: '5%', left: "15%" }}>
                <form className='border border-info rounded p-4 m-5' onSubmit={handleSaveBook}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="title" name='title' value={title} onChange={handleTitleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="author" aria-describedby="author" name='author' value={author} onChange={handleAuthorChange} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="publishYear" className="form-label">Publish Year</label>
                        <input
                            type="date"
                            className="form-control"
                            id="publishYear"
                            aria-describedby="publishYear"
                            name="publishYear"
                            value={publishYear}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgUrl" className="form-label">Image Url</label>
                        <input type="text" className="form-control" name='imgUrl' id="imgUrl" value={imgUrl} onChange={handleImgUrlChange} required />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input border border-info"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                            onChange={handleAvailabilityStatusChange}
                            checked={availabilityStatus}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Available
                        </label>
                    </div>

                    {loading ? (<Spinner />) : (<button type="submit" className="btn btn-primary">Add Book</button>)}
                </form>

            </div>
        </div>
    )
}

export default CreateBook
