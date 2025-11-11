import defaultImg from "/Fuckass.png"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CommentComponent } from "../comment/CommentComponent";
import { toast } from 'react-toastify';

export function OneBlogComponent({ blog, setBlogs }) {

    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const navigate = useNavigate();
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
        async function fetchUserLikes() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}?includeLikedPosts=true`, { withCredentials: true });
                if (res.data?.data) {
                    if(res.data.data.includes(blog._id))
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


    async function updateLikes(blogId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${blogId}`,
                {
                    withCredentials: true,
                });
            navigate(`/blog/${(res.data.data.genre.toLowerCase())}/${blogId}`, { state: { blog: res.data.data } });
        } catch (err) {
            if (err.response?.data?.message)
                toast.warn(`${err.response.data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            else
                toast.warn(`An error occurred while fetching the blog.`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
        }
    }

    async function handleButtonClick(blogId) {
        updateLikes(blogId);
    }

    function handleUserPosts(authorId, authorUsername) {
        navigate(`/author/${authorUsername}/${authorId}`, {
            state: {
                authorId: authorId,
                authorUsername: authorUsername
            }
        });
    }

    async function handleLikeButton(blogId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${blogId}?like=true`,
                {}, {
                withCredentials: true
            });
            console.log(res.data);

            if (res.data.success) {
                setBlogs(prevBlogs => prevBlogs.map(blog =>
                    blog._id === blogId
                        ? {
                            ...blog,
                            likes_count: res.data.totalLikes,
                            isLiked: res.data.liked
                        }
                        : blog
                ))
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

    function handleCommentButton() {
        showComments ? setShowComments(false) : setShowComments(true);
    }

    function handleRepostButton() {

    }

    return (
        <div
            className="recent-blogs-container"
        >
            <div className="user-information">
                <img className="user-logo" src={defaultImg} />
                <div className="username-genre">
                    <p
                        onClick={() => handleUserPosts(blog.author?._id, blog.author?.username)}
                    >{blog.author ? blog.author.username : "Unknown"}</p>
                    <p>{blog.genre}</p>
                </div>
            </div>
            <div className="blog-information">
                <p className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</p>
                <h1 className="blog-header">{blog.title}</h1>
                <p className="blog-intro">{blog.introduction}</p>
                <div className="blog-ratings">
                    <button
                        className={liked ? "like-button-filled" : "like-button"}
                        onClick={() => handleLikeButton(blog._id)}
                    >{totalLikes || 0}</button>

                    <button
                        className="comment-button"
                        onClick={handleCommentButton}
                    >{blog.comments_count}</button>

                    <button
                        className="reposts-button"
                        onClick={handleRepostButton}
                    >{blog.reposts_count}</button>
                </div>
            </div>
            <button
                className="view-blog-button"
                onClick={() => handleButtonClick(blog._id)}
            >View Blog</button>
            {showComments ? (
                <CommentComponent
                    className="comments-container"
                    postId={blog._id}
                    showComments={showComments}
                    setShowComments={setShowComments}
                    />
            ) : null}
        </div>
    )
}