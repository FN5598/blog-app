import "./FooterComponent.css";

export function FooterComponent() {
    return (
        <div className="footer-container">
            <div className="home-links">
                <h1>Home</h1>
                <ul>
                    <p>Features</p>
                    <p>Blogs</p>
                    <p>Resources</p>
                    <p>Testimonials</p>
                    <p>Contact Us</p>
                    <p>Newsletter</p>
                </ul>
            </div>
            <div className="blogs-links">
                <h1>Blogs</h1>
                <ul>
                    <p>Quantum Computing</p>
                    <p>Ai Ethics</p>
                    <p>Space Exploration</p>
                    <p>Biotechnology</p>
                    <p>Renewable Energy</p>
                    <p>Biohacking</p>
                </ul>
            </div>
            <div className="podcasts-links">
                <h1>Podcasts</h1>
                <ul>
                    <p>AI Revolution</p>
                    <p>TechTalk AI</p>
                    <p>AI Conversations</p>
                </ul>
            </div>
            <div className="resources-links">
                <h1>Resources</h1>
                <div className="resources-buttons">
                    <button>Whitepapers</button>
                    <button>Ebooks</button>
                    <button>Reports</button>
                    <button>Research Papers</button>
                </div>
            </div>
        </div>
    );
}