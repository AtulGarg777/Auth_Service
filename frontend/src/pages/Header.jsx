import React from 'react'
import { useState } from 'react'
import { songFromApi } from '../utils';
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

    return (
        <div className='header'>
            <div>
                <h2 style={{color:'white'}}><Link to='/home'>LOGO</Link></h2>
            </div>
            <div className='header_inp'>
                <input type="text" name='search' placeholder='Search...' value={srchQuery} onChange={(e) => handleSrch(e)} />
                <p onClick={getSongs}><i className='fa fa-search'></i></p>
            </div>
        </div>
    )
}

export default Header
