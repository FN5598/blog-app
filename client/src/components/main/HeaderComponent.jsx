import { useNavigate, useLocation } from 'react-router-dom'
import "./HeaderComponent.css";
import logo from "/Logo.png";
import axios from 'axios';
import { checkAuth } from '../../utils/checkAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function HeaderComponent() {

    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useState(null);

    const verifyAuth = async () => {
        const isAuth = await checkAuth();
        setAuth(isAuth);
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    const handleButtonClick = (path) => {
        navigate(path);
    }

    const handleProtectedRouteClick = async (path) => {
        verifyAuth();
        if (auth) {
            navigate(path);
        } else {
            toast.warn("Cannot access the page. Please Login", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
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
                    className={location.pathname === '/blogs' ? 'active-button' : 'button'}
                    onClick={() => handleButtonClick('/blogs')}
                >Blogs</button>
                <button
                    className={location.pathname === '/create-blog' ? 'active-button' : 'button'}
                    onClick={() => handleProtectedRouteClick('/create-blog')}
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