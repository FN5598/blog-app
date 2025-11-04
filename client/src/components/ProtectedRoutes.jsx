import "./ProtectedRoutes.css";
import { checkAuth } from '../utils/checkAuth';
import { useEffect, useState } from 'react';
import exclamationMark from '/Exclamation-mark.png';
import closeIcon from '/Close.png'
import { NavLink, useNavigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [visible, setVisible] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const auth = await checkAuth();
            setIsAuthenticated(auth);
        })();
    }, []);
    if (isAuthenticated === null) return <div>Loading...</div>;

    localStorage.setItem('isAuthenticated', isAuthenticated);

    function handleClose() {
        setVisible(false);
        navigate('/');
    }

    return (
        isAuthenticated ? children : (
            visible && (
                <div className="access-failed-pop-up">
                    <img src={exclamationMark} className="alert-image" />
                    <h1>Access Failed</h1>
                    <p>Currently you are not logged in <NavLink to="/login" >Click here to login</NavLink></p>
                    <img className="close-icon" src={closeIcon} onClick={handleClose} />
                </div>)
        )
    );
}