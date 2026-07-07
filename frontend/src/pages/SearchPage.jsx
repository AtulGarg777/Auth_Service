import React from 'react'
import Cards from './Cards'
import { useSearchParams } from 'react-router-dom'
import MusicBar from './MusicBar';
import Header from './Header';
import CardsSection from './CardsSection';

function SearchPage() {
    let [searchParams] = useSearchParams();
    let q = searchParams.get('q');
    return (
        <div>
            <Header />
            <CardsSection limit={30} query={q} songCategory={`${q} Song`}/>
            <MusicBar />
        </div>
    )
}

export default SearchPage
