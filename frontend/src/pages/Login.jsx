import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Login() {

    let [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("Enter Email And Password");
        }
        
        try {
            let baseUrl=import.meta.env.VITE_API_URL;
            let response = await fetch(`${baseUrl.replace(/\/+$/,"")}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            let result = await response.json();
            let { success, message, jwtToken, email, name ,error} = result;
            if(success){
                localStorage.setItem('Token',jwtToken);
                localStorage.setItem('User',name);
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    }

    const handleValue = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form action="" onSubmit={handleLogin} style={{ padding: '20px 50px' }}>
                <h2><b className='text-purple-600 text-3xl'>Login</b></h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter Your Email' value={loginInfo.email} onChange={handleValue} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter Your Password' name='password' value={loginInfo.password} onChange={handleValue} />
                </div>
                <button type='submit' style={{ margin: '0 auto', cursor: 'pointer' }}>Login</button>

                <h3>Don't Have an account? <Link to='/signup' className='text-purple-600'>SignUp</Link></h3>
            </form>
        </div>
    )
}

export default Login
