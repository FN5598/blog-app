import './CreateBlogPage.css';
import { HeaderComponent } from '../../components/main/HeaderComponent';
import { FooterComponent } from '../../components/main/FooterComponent';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function CreateBlogPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [content, setContent] = useState('');
    const [genre, setGenre] = useState('');

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === 'title') {
            setTitle(value);
        } else if (name === "introduction") {
            setIntroduction(value);
        } else if (name === "content") {
            setContent(value);
        } else if (name === "genre") {
            setGenre(value);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/`,
                {
                    title,
                    content,
                    genre,
                    introduction
                }, {
                withCredentials: true
            });
            console.log(res.data.data);
            toast.success(`${res.data.success}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            navigate(`/blog/${res.data.data._id}`);
        } catch (err) {
            if (err.response?.data?.message) {
                toast.success(`${err.response.data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            } else {
                toast.success("Error handling submit button", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }
    }

    return (
        <>
            <HeaderComponent />
            <form className="create-blog-page-container">
                <h1 className="create-blog-h1">Create Quick Blog Form</h1>
                <div className="create-blog-inputs-container">

                    <div className='title-genre-container'>
                        <div className="create-blog-title-input-container">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder='Title cannot exceed 100 characters'
                                required
                                onChange={handleChange}
                                value={title}
                            />
                        </div>
                    </div>

                    <div className="create-blog-introduction-input-container">
                        <label htmlFor="introduction">Introduction:</label>
                        <textarea
                            type="text"
                            id="introduction"
                            name="introduction"
                            placeholder='Introduction cannot exceed 300 characters'
                            onChange={handleChange}
                            value={introduction}
                            required
                        />
                    </div>

                    <div className="create-blog-genre-selector-container">
                        <label htmlFor="genre">Genre:</label>
                        <select
                            name="genre"
                            id="genre-select"
                            onChange={handleChange}
                            required>
                            <option value="" className='option'>Please choose a genre</option>
                            <option value="Technology" className='option'>Technology</option>
                            <option value="Politics" className='option'>Politics</option>
                            <option value="Health" className='option'>Health</option>
                            <option value="Environment" className='option'>Environment</option>
                            <option value="Sports" className='option'>Sports</option>
                            <option value="General" className='option'>General</option>
                        </select>
                    </div>

                    <div className="create-blog-content-input-container">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            type="text"
                            id="content"
                            name="content"
                            placeholder='Content cannot exceed 10,000 characters'
                            required
                            onChange={handleChange}
                            value={content}
                        />
                    </div>

                </div>
                <button
                    type="submit"
                    className="create-blog-submit-button"
                    onClick={handleSubmit}
                >Submit Blog</button>
            </form>
            <FooterComponent />
        </>
    );
}