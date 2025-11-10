import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { OneBlogComponent } from '../../components/blog/OneBlogComponent';
import { ThreeDot } from 'react-loading-indicators';
import { HeaderComponent } from '../../components/main/HeaderComponent';
import { FooterComponent } from '../../components/main/FooterComponent';
import { toast } from 'react-toastify';

export function BlogAuthorPage() {

    const [blogs, setBlogs] = useState([]);

    const location = useLocation();
    const authorId = location.state?.authorId;

    useEffect(() => {
        fetchAuthorBlogs(authorId);
    }, [authorId]);


    async function fetchAuthorBlogs(authorId) {
        const params = new URLSearchParams();
        if (authorId) params.append('author', authorId)

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
            } else {
                toast.error(`An error occurred while fetching blogs.`, {
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
            {blogs ? blogs.map(blog => (
                <OneBlogComponent blog={blog} setBlogs={setBlogs} key={blog._id} />
            )) :
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", gap: "30px", marginBottom: "50px" }}>
                    <div style={{ color: "white", fontSize: "24px", textAlign: "center", marginTop: "20px" }}>
                        Loading Blogs
                    </div>
                    <ThreeDot color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
                </div>}
            <FooterComponent />
        </>
    )
}