import "./BlogsComponent.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDot } from "react-loading-indicators";
import { OneBlogComponent } from "./OneBlogComponent";

export function BlogsComponent() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);


    async function fetchBlogs(genre, limit, author) {
        const params = new URLSearchParams();
        if (genre) params.append('genre', genre);
        if (limit) params.append('limit', limit)
        else limit = 10
        if (author) params.append('author', author)

        const url = `${import.meta.env.VITE_API_URL}/api/posts?${params.toString()}`;
        try {
            const response = await axios.get(url,
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


    async function handleTagClick(e) {
        const { name } = e.target;
        fetchBlogs(name);
    }

    return (
        <>
            <div className="blogs-tags-container">
                <button
                    name=""
                    onClick={handleTagClick}
                >General</button>

                <button
                    name="Technology"
                    onClick={handleTagClick}
                >Technology</button>

                <button
                    name="Politics"
                    onClick={handleTagClick}
                >Politics</button>

                <button
                    name="Health"
                    onClick={handleTagClick}
                >Health</button>

                <button
                    name="Environment"
                    onClick={handleTagClick}
                >Enviroment</button>

                <button
                    name="Sports"
                    onClick={handleTagClick}
                >Sports</button>
            </div>
            {(blogs.length > 0) ? (blogs.map(blog => {
                return (
                    <OneBlogComponent blog={blog} setBlogs={setBlogs} key={blog._id} />
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