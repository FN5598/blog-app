import axios from 'axios';

export async function checkAuth() {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
            {
                withCredentials: true
            });
        return res.data.authenticated;
    } catch (err) {
        if (err.response?.status === 401) {
            try {
                const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {}, {
                        withCredentials: true
                    });
                    console.log(refreshRes.data.success);
                const retryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
                    {
                        withCredentials: true
                    });
                return retryRes.data.authenticated;
            } catch {
                return false;
            }
        }
    }
}