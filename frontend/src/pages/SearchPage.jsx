import React from 'react'
import Cards from './Cards'
import { useSearchParams } from 'react-router-dom'
import MusicBar from './MusicBar';
import Header from './Header';

function SearchPage() {
    let [searchParams] = useSearchParams();
    let q = searchParams.get('q');
    return (
        <div>
            <Header />
            <section className='' style={{ margin: '20px 6rem' }}>
                <Cards limit={30} query={q} />
            </section>
            <MusicBar />
        </div>
    )
}

export default SearchPage
