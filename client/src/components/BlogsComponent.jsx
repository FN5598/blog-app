import defaultImg from "/Fuckass.png"
import "./BlogsComponent.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

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
                setBlogs(response.data.data);
                console.log(response.data.data);
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
            navigate(`/blog/${(res.data.data.genre.toLowerCase())}/${blogId}`, { state: { blog: res.data.data } });
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
            {(blogs.length > 0) ? (blogs.map(blog => {
                return (
                    <div
                        className="recent-blogs-container"
                        key={blog._id}
                    >
                        <div className="user-information">
                            <img className="user-logo" src={defaultImg} />
                            <div className="username-genre">
                                <p>{blog.author ? blog.author.username : "Unknown"}</p>
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
            })) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", gap: "30px", marginBottom: "50px" }}>
                    <div style={{ color: "white", fontSize: "24px", textAlign: "center", marginTop: "20px" }}>
                        Loading Blogs
                    </div>
                    <ThreeDot color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
                </div>
            )}
        </>
    );
}