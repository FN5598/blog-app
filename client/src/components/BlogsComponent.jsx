import defaultImg from "/Fuckass.png"
import "./BlogsComponent.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export function BlogsComponent() {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchBlogs() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`,
                    {
                        withCredentials: true,
                    });
                console.log(response.data);
                setBlogs(response.data);
            } catch (err) {
                if (err.response?.data?.message) {
                    alert(err.response.data.message);
                } else {
                    alert("An error occurred while fetching blogs.");
                }
            }
        }


        fetchBlogs();
    }, []);

    async function handleButtonClick(blogId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${blogId}`,
                {
                    withCredentials: true,
                });
            navigate(`/blog/${(res.data.genre.toLowerCase())}/${blogId}`, { state: { blog: res.data } });
        } catch (err) {
            if (err.response?.data?.message)
                alert(err.response.data.message);
            else
                alert("An error occurred while fetching the blog.");
        }
    }

    return (
        <>
            <div className="blogs-tags-container">
                <button>General</button>
                <button>Technology</button>
                <button>Politics</button>
                <button>Health</button>
                <button>Enviroment</button>
                <button>Sports</button>
            </div>
            {blogs.map(blog => {
                return (
                    <div
                        className="recent-blogs-container"
                        key={blog._id}
                    >
                        <div className="user-information">
                            <img className="user-logo" src={defaultImg} />
                            <div className="username-genre">
                                <p>{blog.author_name}</p>
                                <p>{blog.genre}</p>
                            </div>
                        </div>
                        <div className="blog-information">
                            <p className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</p>
                            <h1 className="blog-header">{blog.title}</h1>
                            <p className="blog-intro">{blog.content}</p>
                            <div className="blog-ratings">
                                <button className="like-button">{blog.likes_count}</button>
                                <button className="comment-button">{blog.comments_count}</button>
                                <button className="reposts-button">{blog.reposts_count}</button>
                            </div>
                        </div>
                        <button
                            className="view-blog-button"
                            onClick={() => handleButtonClick(blog._id)}
                        >View Blog</button>
                    </div>
                )
            })}
        </>
    );
}