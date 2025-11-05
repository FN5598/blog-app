import "./BlogPage.css";
import { useLocation } from "react-router-dom";

export function BlogPage() {

    const location = useLocation();
    const { state } = location;

    const blog = state?.blog;

    return (
        <div>
            <h1>{blog?.title}</h1>
            <p>{blog?.content}</p>
        </div>
    )
}