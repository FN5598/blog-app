import linkedIn from '/LinkedIn-icon.png';
import twitter from '/Twitter-icon.png'
import someIcon from '/Some-icon.png';
import './GeneralInquiriesComponent.css';

export function GeneralInquiriesComponent() {
    return (

        <div className="general-inquiries-container">
            <div className="general-inquiries">
                <h1>General Inquiries</h1>
                <button>contact@ai-podcasts.com</button>
                <button>+1 (123) 456-7890</button>
            </div>
            <div className="technical-support">
                <h1>Technical Support</h1>
                <button>support@ai-podcasts.com</button>
                <button>+1 (123) 456-7891</button>
            </div>
            <div className="our-office">
                <h1>Our Office</h1>
                <p>Address: 123 AI Tech Avenue, Techville, 54321</p>
                <button>Get Directions</button>
            </div>
            <div className="connect-with-us">
                <h1>Connect with Us</h1>
                <p>Follow us on social media:</p>
                <div className="media-container">
                    <button><img src={twitter} /></button>
                    <button><img src={someIcon} /></button>
                    <button> <img src={linkedIn} /> </button>
                </div>
            </div>
        </div>

    );
}