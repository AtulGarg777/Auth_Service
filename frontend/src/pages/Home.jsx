import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

function Home() {

    let navigate = useNavigate();
    let [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(localStorage.getItem('User'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        navigate('/login');
        handleSuccess('logout successfully');
    }

    return (
        <div>
            <h2>Welcome, {userName}</h2>
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
