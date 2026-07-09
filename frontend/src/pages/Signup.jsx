import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess, handleError } from '../utils'

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
        try {
            let baseUrl=import.meta.env.VITE_API_URL;
            const url = `${baseUrl.replace(/\/+$/,"")}/auth/signup`;
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
        } catch (error) {
            handleError(error.message);
        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <h2 className='text-purple-600 text-3xl'><b>Sign Up</b></h2>
                <div>
                    <label htmlFor="name" className='text-purple-600'><b>Name</b></label>
                    <input type="text" placeholder='Enter Your Name' name='name' value={signupInfo.name} onChange={handleValue} />
                </div>
                <div>
                    <label htmlFor="email" className='text-purple-600'><b>Email</b></label>
                    <input type="email" placeholder='Enter Your Email' name='email' value={signupInfo.email} onChange={handleValue} />
                </div>
                <div>
                    <label htmlFor="password" className='text-purple-600'><b>Password</b></label>
                    <input type="password" placeholder='Enter Your password' name='password' value={signupInfo.password} onChange={handleValue} />
                </div>
                <button type='submit' className='cursor-pointer' style={{ margin: '0 auto'}}>Signup</button>
                <div>
                    <h3>Already Have an account? <Link to='/login' className='text-purple-600 '>
                    <b>Login</b></Link></h3>
                </div>
            </form>
        </div>
    )
}

export default Signup
