import defaultImg from "/Fuckass.png"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CommentComponent } from "./CommentComponent";

export function OneBlogComponent({ blog, setBlogs }) {

    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotallikes] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        async function getUserBlogLike() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?likes=true&user_id=${userId}&blog_id=${blog._id}`, { withCredentials: true });
                if (res.data?.isLiked) {
                    setLiked(res.data.isLiked);
                    setTotallikes(res.data.totalLikes)
                } else {
                    setLiked(false);
                }
            } catch (err) {
                if (err.response?.data?.message) {
                    return console.log(err.response.data.message);
                } else {
                    return console.log("Error fetching user liked posts")
                }
            }
        }

        getUserBlogLike();
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
                alert(err.response.data.message);
            else
                alert("An error occurred while fetching the blog.");
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
                setTotallikes(res.data.totalLikes);
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
        setShowComments(true);
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
                {showComments && (
                    <CommentComponent postId={blog._id}/>
                )}

            </div>
            <button
                className="view-blog-button"
                onClick={() => handleButtonClick(blog._id)}
            >View Blog</button>
        </div>
    )
}