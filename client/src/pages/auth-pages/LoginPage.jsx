import './AuthForm.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import visiblePasswordIcon from '/Visible-password.png'
import { toast } from 'react-toastify';

export function LoginPage() {

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    };

    function handleEmailChange(e) {
        setEmail(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    password,
                    email
                },
                {
                    withCredentials: true
                });
            localStorage.setItem("userId", res.data.user.id)
            toast.success("Login successful!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            navigate('/');
        } catch (err) {
            console.log(err);
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
                toast.error("Login failed. Please try again", {
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
        <form className='login-container'>
            <h1 className='text-container'>Login to your account</h1>

            <p className='email-text'>Email</p>
            <input
                className='email-input'
                type="email"
                placeholder='Enter your email'
                name="email"
                onChange={handleEmailChange}
                value={email}
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
            >Login now</button>

            <p className='account-text'>Don't Have An Account? <NavLink to="/sign-up" className="redirect">Sign Up</NavLink></p>
        </form>
    );
}