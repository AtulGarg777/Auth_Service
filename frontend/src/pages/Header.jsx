import React from 'react'
import { useState } from 'react'
import { handleSuccess, songFromApi } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    let [srchQuery, setSrchQuery] = useState('');

    let navigate = useNavigate();


    function handleSrch(e) {
        setSrchQuery(e.currentTarget.value);
    }

    function getSongs() {
        if (srchQuery) {
            navigate(`/search?q=${srchQuery.trim()}`)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        navigate('/login');
        handleSuccess('logout successfully');
    }

    return (
        <div className='bg-neutral-900 text-white sm:flex justify-around py-4 items-center'>
            <div>
                <h2 className='text-2xl text-red-500'><Link to='/home'>&nbsp;&nbsp;Streamify</Link></h2>
            </div>
            <div className='flex items-center justify-center pt-1.5'>
                <div className='flex items-center bg-neutral-950 border-0 rounded-md pe-2.5'>
                    <input className='focus:outline-0' type="text" name='search' placeholder='Search...' value={srchQuery} onChange={(e) => handleSrch(e)} />
                    <p onClick={getSongs}><i className='fa fa-search'></i></p>

                </div>
                <p className="pl-2 sm:pl-6">
                    <button style={{ padding: '5px 15px', backgroundColor: 'var(--color-red-400)' }} onClick={handleLogout}>Logout</button>
                </p>
            </div>
        </div>
    )
}

export default Header
