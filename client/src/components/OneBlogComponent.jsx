import defaultImg from "/Fuckass.png"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function OneBlogComponent({ blog }) {

    const navigate = useNavigate();

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

    function handleUserPosts(authorId, authorUsername) {
        navigate(`/author/${authorUsername}/${authorId}`, {
            state: {
                authorId: authorId,
                authorUsername: authorUsername
            }
        });
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
}