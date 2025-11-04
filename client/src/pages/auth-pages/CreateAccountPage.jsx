import './AuthForm.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import visiblePasswordIcon from '/Visible-password.png'

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
                alert("Successfully Created New Account. Please Login to verify");
                navigate('/login');
            } else {
                alert(res.data.message || "Login failed");
            }
        } catch (err) {
            console.log("Error creating new account:", err);
            if (err.response?.data?.message) {
                alert(err.response.data.message)
            } else {
                alert("Failed to create new account");
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