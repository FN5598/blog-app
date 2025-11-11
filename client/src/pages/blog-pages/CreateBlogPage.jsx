import './CreateBlogPage.css';
import { HeaderComponent } from '../../components/main/HeaderComponent';
import { FooterComponent } from '../../components/main/FooterComponent';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../utils/checkAuth';

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
        checkAuth();
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
            console.log(res.data);
            toast.success(`${res.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            navigate(`/blog/${(res.data.data.genre).toLowerCase()}/${res.data.data._id}`, { state: { blog: res.data.data } });
        } catch (err) {
            if (err.response?.data?.message) {
                toast.warning(`${err.response.data.message}`, {
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
                toast.error("Error handling submit button", {
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
                            <textarea
                                id="title"
                                name="title"
                                placeholder='Title cannot exceed 100 characters'
                                required
                                onChange={handleChange}
                                value={title}
                                maxLength={100}
                            />
                            <span className={title.length >= 100 ? 'input-value-length-red' : 'input-value-length'}>{title.length}/100</span>
                        </div>
                    </div>

                    <div className="create-blog-introduction-input-container">
                        <label htmlFor="introduction">Introduction:</label>
                        <textarea
                            id="introduction"
                            name="introduction"
                            placeholder='Introduction cannot exceed 300 characters'
                            onChange={handleChange}
                            value={introduction}
                            required
                            maxLength={300}
                        />
                        <span className={introduction.length >= 300 ? 'input-value-length-red' : 'input-value-length'}>{introduction.length}/300</span>
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
                            id="content"
                            name="content"
                            placeholder='Content cannot exceed 10,000 characters'
                            required
                            onChange={handleChange}
                            value={content}
                            maxLength={10000}
                        />
                        <span className={content.length >= 10000 ? 'input-value-length-red' : 'input-value-length'}>{content.length}/10000</span>
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