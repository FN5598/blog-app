import defaultImg from "/Fuckass.png"
import "./BlogsComponent.css";

export function BlogsComponent() {
    return (
        <>
            <div className="blogs-tags-container">
                <button>All</button>
                <button>Technology</button>
                <button>Politics</button>
                <button>Health</button>
                <button>Enviroment</button>
                <button>Sports</button>
            </div>
            <div
                className="recent-blogs-container"
            >
                <div className="user-information">
                    <img className="user-logo" src={defaultImg} />
                    <div className="username-genre">
                        <p>John Techson</p>
                        <p>Technology</p>
                    </div>
                </div>
                <div className="blog-information">
                    <p className="blog-date">October 15, 2025</p>
                    <h1 className="blog-header">Tech Giants Announce New Product</h1>
                    <p className="blog-intro">Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape</p>
                    <div className="blog-ratings">
                        <button className="like-button">24.5k</button>
                        <button className="comment-button">50</button>
                        <button className="reposts-button">20</button>
                    </div>
                </div>
                <button className="view-blog-button">View Blog</button>
            </div>
        </>
    );
}