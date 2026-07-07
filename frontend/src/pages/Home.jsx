import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import '../css/songCard.css'
import Cards from './Cards';
import MusicBar from './MusicBar';
import Header from './Header';
import CardsSection from './CardsSection';

function Home() {

    let navigate = useNavigate();
    let [userName, setUserName] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setUserName(localStorage.getItem('User'))
    }, [])

    return (
        <div>
            <Header />
            <CardsSection songCategory={'Trending Songs'} limit={12} query={'sid'} />
            <CardsSection songCategory={'Popular Songs'} limit={12} query={'dilj'} />
            <MusicBar />

            {/* <div>
                <h2>Welcome, {userName}</h2>
            </div> */}

        </div>


    )
}

export default Home
