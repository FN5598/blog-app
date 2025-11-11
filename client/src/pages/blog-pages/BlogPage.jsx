import { HeaderComponent } from "../../components/main/HeaderComponent";
import { FooterComponent } from "../../components/main/FooterComponent";
import "./BlogPage.css";
import { FourSquare, ThreeDot } from "react-loading-indicators";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Technology from "/Technology-background.jpg";
import Politics from "/Politics-background.jpg";
import Health from "/Health-background.jpg";
import Environment from "/Enviroment-background.jpg";
import Sports from "/Sports-background.jpg";
import General from "/General-background.jpg";
import { PartOfTeamComponent } from "../../components//PartOfTeamComponent";
import { toast } from 'react-toastify';
import { blogReadingTime } from "../../utils/blogReadingTime";

export function BlogPage() {

    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const blogId = pathParts[pathParts.length - 1];
    const [blog, setBlog] = useState(location.state?.blog);
    const [loading, setLoading] = useState(location.state?.blog ? false : true);
    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(null);
    const userId = localStorage.getItem("userId")


    useEffect(() => {
        async function fetchLikes() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?likes=true&user_id=${userId}&blog_id=${blog._id}`, { withCredentials: true });
                setTotalLikes(res.data?.totalLikes || 0);
            } catch (err) {
                console.log(err.response?.data?.message || "Error fetching likes");
                setLiked(false);
                setTotalLikes(0);
            }
        }
        fetchLikes();
    }, [blog._id, userId]);

    useEffect(() => {
        async function fetchBlog(blogId) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${blogId}`,
                    {
                        withCredentials: true,
                    });
                setBlog(res.data);
                console.log(res.data);
            } catch (err) {
                if (err.response?.data?.message)
                    toast.error(`${err.response.data.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                else
                    toast.error(`An error occurred while fetching the blog.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
            } finally {
                setLoading(false);
            }
        };
        if (!location.state?.blog && blogId) {
            fetchBlog(blogId);
        }
    }, [blogId, location.state?.blog]);


    useEffect(() => {
        async function fetchUserLikes() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}?includeLikedPosts=true`, { withCredentials: true });
                if (res.data?.data) {
                    if (res.data.data.includes(blog._id))
                        setLiked(true);
                } else {
                    setLiked(false);
                }
            } catch (err) {
                console.log(err.response?.data?.message || "Error fetching user likes");
                setLiked(false);
            }
        }
        fetchUserLikes();
    }, [blog._id, userId]);

    if (loading) {
        return (
            <>
                <HeaderComponent />
                <div className="loading-container">
                    <ThreeDot color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
                </div>
            </>
        )
    }

    function getBackgroundImage(genre) {
        const genreMap = {
            Technology,
            Politics,
            Health,
            Environment,
            Sports,
            General
        };
        return genreMap[genre] || General;
    };

    let backgroundImage;
    if (blog) {
        backgroundImage = getBackgroundImage(blog.genre);
    }

    function LazyImage({ src, alt }) {
        const [loadedImage, setLoadedImage] = useState(false);

        return (
            <div className="relative w-full h-64">
                {!loadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FourSquare color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
                    </div>
                )}
                <img
                    src={src}
                    alt={alt}
                    className={`genre-image ${loadedImage ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoadedImage(true)}
                    loading="lazy"
                />
            </div>
        );
    }

    async function handleLikeButton(blogId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${blogId}?like=true`,
                {}, {
                withCredentials: true
            });
            console.log(res.data);

            if (res.data.success) {
                setTotalLikes(res.data.totalLikes);
            }
            setLiked(res.data.liked);

        } catch (err) {
            if (err.response?.data?.message) {
                return console.log(err.response.data.message)
            } else {
                return console.log("Error updating likes count");
            }
        }
    }


    return (
        blog ? (<div className="blog-container">
            <HeaderComponent />
            <LazyImage src={backgroundImage} alt={blog.title} />
            <h1 className="blog-page-title">{blog.title}</h1>

            <div className="blog-page-details">
                <div className="blog-page-text">
                    <p className="blog-page-intro">{blog.introduction}</p>
                    <p className="blog-page-content">{blog.content}</p>
                </div>
                <div className="blog-full-information">
                    <div className="likes-comments-reposts-container">
                        <button className={liked ? "like-button-filled" : "like-button"} onClick={() => handleLikeButton(blog._id)} >{totalLikes}</button>
                        <button className="comment-button">{blog.comments_count}</button>
                        <button className="reposts-button">{blog.reposts_count}</button>
                    </div>
                    <div className="additional-info-container">
                        <div className="publication-date-container">
                            <p>Publication Date</p>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="category-container">
                            <p>Category</p>
                            <span>{blog.genre}</span>
                        </div>
                        <div className="reading-time-container">
                            <p>Reading Time</p>
                            <span>{blogReadingTime(blog.content.length)}</span>
                        </div>
                        <div className="blog-author-container">
                            <p>Author</p>
                            <span>{blog.author ? blog.author.username : "Unknown"}</span>
                        </div>
                    </div>

                </div>
            </div>
            <PartOfTeamComponent />
            <FooterComponent />
        </div>
        ) : (
            <div>Blog not found</div> // Or your loading/error state
        )

    )
}