import { useNavigate, useLocation } from 'react-router-dom'
import "./HeaderComponent.css";
import logo from "/Logo.png";
import axios from 'axios';
import { checkAuth } from '../utils/checkAuth';
import { useEffect, useState } from 'react';

export function HeaderComponent() {

    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useState(null);


    useEffect(() => {
        const isAuth = checkAuth();
        setAuth(isAuth);
    }, []);


    const handleButtonClick = (path) => {
        navigate(path);
    }

    async function handleLogout() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
            if (res.data.success) {
                navigate('/login');
                localStorage.clear();
            }
        } catch (err) {
            if (err.response?.data?.message) {
                return console.log(err.response.data.message)
            } else {
                return console.log("Error logging out");
            }
        }
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
                    className={location.pathname === '/blogs' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/blogs')}
                >Blogs</button>
                <button
                    name="last-visited"
                    className={location.pathname === '/last-visited' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/last-visited')}
                >Last visited</button>
                <button
                    className={location.pathname === '/create-blog' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/create-blog')}
                >Create Blog</button>
            </div>
            <button
                className='contact-us-button'
                onClick={() => handleButtonClick('/contact-us')}
            >Contact us</button>
            {auth ?
                <button
                    onClick={handleLogout}
                    className='contact-us-button'>
                    Logout
                </button> :
                <button
                    onClick={() => handleButtonClick('/login')}
                    className='contact-us-button'>
                    Login
                </button>
            }
        </div>
    );
}