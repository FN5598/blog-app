import "./ProtectedRoutes.css";
import { useEffect, useState } from 'react';
import exclamationMark from '/Exclamation-mark.png';
import closeIcon from '/Close.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { HeaderComponent } from "./HeaderComponent";
import { checkAuth } from "../utils/checkAuth";

export function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [visible, setVisible] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = checkAuth();
        setIsAuthenticated(isAuth);
    }, []);
    if (isAuthenticated === null) return <div>Loading...</div>;

    function handleClose() {
        setVisible(false);
        navigate('/');
    }

    localStorage.setItem('isAuthenticated', isAuthenticated);
    return (
        isAuthenticated ? children : (
            visible && (
                <>
                    <HeaderComponent />
                    <div className="access-failed-pop-up">
                        <img src={exclamationMark} className="alert-image" />
                        <h1>Access Failed</h1>
                        <p>Currently you are not logged in <NavLink to="/login" >Click here to login</NavLink></p>
                        <img className="close-icon" src={closeIcon} onClick={handleClose} />
                    </div>
                </>)
        )
    );
}