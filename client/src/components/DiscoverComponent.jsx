import { BlogsComponent } from "./blog/BlogsComponent";
import "./DiscoverComponent.css";
import { useNavigate } from "react-router-dom";

export function DiscoverComponent() {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="blogs-introduction-container">
                <div className="blogs-introduction-wrapper">
                    <p className="welcome-to-hub-p">Welcome to our new hub</p>
                    <h1 className="discover-blogs-text">Discover the World of Blogs</h1>
                </div>
                <button 
                onClick={() => navigate('/blogs')}
                className="view-all-blogs-button">View All Blogs</button>
            </div>

            <BlogsComponent limit={10}/>
        </>
    );
}