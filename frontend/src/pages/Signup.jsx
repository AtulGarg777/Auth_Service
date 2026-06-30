import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess, handleError } from '../utils'
import { ToastContainer } from 'react-toastify';

function Signup() {

    let [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    let navigate = useNavigate();

    function handleValue(e) {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password is required');
        }
        handleSuccess('user registred successfully');
        try {
            const url = 'http://localhost:8000/auth/signup';
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else if (!success) {
                handleError(message);
            }

            console.log(result);

        } catch (error) {
            handleError(error.message);
        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter Your Name' name='name' value={signupInfo.name} onChange={handleValue} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter Your Email' name='email' value={signupInfo.email} onChange={handleValue} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter Your password' name='password' value={signupInfo.password} onChange={handleValue} />
                </div>
                <button type='submit' style={{ margin: '0 auto', cursor: 'pointer' }}>Signup</button>
                <div>
                    <h3>Already Have an account? <Link to='/login'>Login</Link></h3>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
