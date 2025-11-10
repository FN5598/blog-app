import { BlogsComponent } from "./blog/BlogsComponent";
import "./DiscoverComponent.css";

export function DiscoverComponent() {
    return (
        <>
            <div className="blogs-introduction-container">
                <div className="blogs-introduction-wrapper">
                    <p className="welcome-to-hub-p">Welcome to our new hub</p>
                    <h1 className="discover-blogs-text">Discover the World of Blogs</h1>
                </div>
                <button className="view-all-blogs-button">View All Blogs</button>
            </div>

            <BlogsComponent />
        </>
    );
}