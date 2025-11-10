import { HeaderComponent } from "../../components/main/HeaderComponent";
import { FooterComponent } from "../../components/main/FooterComponent";
import "./BlogPage.css";
import { ThreeDot } from "react-loading-indicators";
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

export function BlogPage() {

    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const blogId = pathParts[pathParts.length - 1];
    const [blog, setBlog] = useState(location.state?.blog);
    const [loading, setLoading] = useState(location.state?.blog ? false : true);

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
                    alert(err.response.data.message);
                else
                    alert("An error occurred while fetching the blog.");
            } finally {
                setLoading(false);
            }
        };


        if (!location.state?.blog && blogId) {
            fetchBlog(blogId);
        }
    }, [blogId, location.state?.blog]);

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
    return (
        blog ? (<div className="blog-container">
            <HeaderComponent />
            <img src={backgroundImage} className="genre-image" />
            <h1 className="blog-page-title">{blog.title}</h1>

            <div className="blog-page-details">
                <div className="blog-page-text">
                    <p className="blog-page-content">{blog.content}</p>
                </div>
                <div className="blog-full-information">
                    <div className="likes-comments-reposts-container">
                        <button className="like-button">{blog.likes_count}</button>
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
                            <span>10 min</span>
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