import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "../../utils/checkAuth";

export function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const isAuth = await checkAuth();
            setIsAuthenticated(isAuth);
            if (!isAuth) navigate('/');
        })();
    }, [navigate]);

    if (isAuthenticated === null) return null;

    return isAuthenticated ? children : null;
}
