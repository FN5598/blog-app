import './AuthForm.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import visiblePasswordIcon from '/Visible-password.png'
import { toast } from 'react-toastify';

export function CreateAccountPage() {

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-up`,
                {
                    password,
                    email
                },
                {
                    withCredentials: true
                });
            if (res.data.success) {
                toast.success("Successfully Created New Account. Please Login to verify", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                navigate('/login');
            } else {
                toast.warn(`${res.data.message}` || "Login failed", {
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
        } catch (err) {
            console.log("Error creating new account:", err);
            if (err.response?.data?.message) {
                toast.error(`${err.response.data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            } else {
                toast.error("Failed to create new account", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }
    }

    return (
        <form className='signup-container'>
            <h1 className='text-container'>Create new account</h1>

            <p className='email-text'>Email</p>
            <input
                className='email-input'
                placeholder='Enter your email'
                name='email'
                value={email}
                type="email"
                onChange={handleEmailChange}
            />

            <div className='password-text'>
                <p>Password</p>
                <p>Forgot ?</p>
            </div>

            <div className='password-container'>
                <input
                    className='password-input'
                    placeholder='Enter your password'
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                ></input>
                <img
                    src={visiblePasswordIcon}
                    className='visible-password'
                    onClick={togglePasswordVisibility} />
            </div>

            <button
                className='login-button'
                onClick={handleSubmit}
            >Create account</button>

            <p className='account-text'>Already Have An Account? <NavLink to="/login" className="redirect">Log In</NavLink></p>
        </form>
    );
}