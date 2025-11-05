import "./PartOfTeamComponent.css";
import logoNoText from '/Logo-no-text.png'
import bigNavigateIcon from '/Navigate-big.png'

export function PartOfTeamComponent() {
    return (
        <div className="part-of-team-container">
            <div className="part-of-team-wrapper">
                <div className="part-of-team-introduction">
                    <img src={logoNoText} className="logo-no-text-image" />
                    <div>
                        <p className="part-of-team-p">Learn, Connect and Innovate</p>
                        <h1 className="part-of-team-h1">Be Part of the Future Tech Revolution</h1>
                        <p className="part-of-team-p-info">Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.</p>
                    </div>
                </div>
                <div className="part-of-team-buttons-container">
                    <div className="resources-button-container">
                        <div className="resources-button-header">
                            <h1>Resources Access</h1>
                            <img src={bigNavigateIcon} />
                        </div>
                        <p>Visitors can access a wide range of resources, including ebooks, whitepapers, reports.</p>
                    </div>
                    <div className="forum-button-container">
                        <div className="forum-button-header">
                            <h1>Community Forum</h1>
                            <img src={bigNavigateIcon} />
                        </div>
                        <p>Join our active community forum to discuss industry trends, share insights, and collaborate with peers.</p>
                    </div>
                    <div className="events-button-container">
                        <div className="events-button-header">
                            <h1>Tech Events</h1>
                            <img src={bigNavigateIcon} />
                        </div>
                        <p>Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}