import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Sidebar from './components/Sidebar';


const EditBook = () => {
    const currentYear = new Date().getFullYear();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

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

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setAvailabilityStatus(response.data.availabilityStatus);
                setPublishYear(response.data.publishYear)
                setImgUrl(response.data.imgUrl)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                enqueueSnackbar('An error occured!');
            })
    }, []);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        // Ensure month and day are always two digits
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
    
        return `${year}-${month}-${day}`;
      };

    const handleEditBook = async (event) => {
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
            .put(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`, bookData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book updated successfully!', { variant: 'success' });
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('All fields are required.', { variant: 'error' });
                console.log(error);
            })
    }

    return (
        <div>
            <div className='position-fixed w-100' >
                <Sidebar />
                <div className='container d-flex justify-content-center align-items-center position-absolute' style={{ height: "90vh", top: '5%', left: "15%" }}>
                    <form className='border border-info rounded p-4 m-5' onSubmit={handleEditBook}>
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
                                max={getCurrentDate()}
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

                        {loading ? (<Spinner />) : (<button type="submit" className="btn btn-primary">Update Book</button>)}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditBook
