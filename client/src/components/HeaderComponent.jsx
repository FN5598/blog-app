import { useNavigate, useLocation } from 'react-router-dom'
import "./HeaderComponent.css";
import logo from "/Logo.png"

export function HeaderComponent() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = (path) => {;
        navigate(path);
    }

    return (
        <div className='header-container'>
            <img 
            src={logo} 
            className='header-logo' 
            onClick={() => handleButtonClick('/')}
            />
            <div className='nav-container'>
                <button
                    className={location.pathname === '/' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick("/")}
                >Home</button>
                <button
                    className={location.pathname === '/about-us' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/about-us')}
                >About</button>
                <button
                    className={location.pathname === '/blog' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/blog')}
                >Blog</button>
                <button
                    className={location.pathname === '/last-visited' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/last-visited')}
                >Last visited</button>
            </div>
            <button
                className='contact-us-button'
                onClick={() => handleButtonClick('/contact-us')}
            >Contact us</button>
        </div>
    );
}