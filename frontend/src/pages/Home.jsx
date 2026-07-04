import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import '../css/songCard.css'
import Cards from './Cards';
import MusicBar from './MusicBar';
import Header from './Header';

function Home() {

    let navigate = useNavigate();
    let [userName, setUserName] = useState('');
    let [isLoading, setIsLoading] = useState(true);

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
            <Header />

            <section className='' style={{ margin: '20px 6rem' }}>
                <h2 style={{ marginBottom: '0px' }}>Trending Songs</h2>
                <Cards limit={10} query={'sid'} />
            </section>
            <section className='' style={{ margin: '20px 6rem' }}>
                    <h2 style={{ marginBottom: '0px' }}>Popular Songs</h2>
                    <Cards limit={10} query={'dilj'} />
                </section><br />

            {/* <div>
                <h2>Welcome, {userName}</h2>
                <button type='button' onClick={handleLogout}>Logout</button>
            </div> */}
            <MusicBar />

        </div>


    )
}

export default Home
