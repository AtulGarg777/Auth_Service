import { useContext, useState } from "react";
import { songFromApi } from "../utils";
import { useEffect } from "react";
import { AudioContext } from "../../AudioContext";
import Header from "./Header";

function Cards({ query, limit }) {
    let [trendingSongs, setTrendingSongs] = useState([]);
    const { currentTrack, isPlaying, playTrack, togglePlayPause } = useContext(AudioContext);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSongs() {
            let response = await songFromApi(query, limit);
            setTrendingSongs(response);
            setIsLoading(false);
        }
        fetchSongs();
    }, [limit])

    function handlePlayBtn(song) {
        let isCurrentActive = currentTrack && currentTrack.id == song.id;
        if (isCurrentActive) {
            togglePlayPause();
        } else {
            playTrack(song, trendingSongs);
        }
    }

    return (
        <>
            <div className="cards_parent">
                {isLoading ? <p>Loading...</p> : trendingSongs.map((song, ind) => {
                    const isCurrentActive = currentTrack && currentTrack.id == song.id;

                    return (<div key={ind} style={{ width: '9.3rem' }} className="card">
                        <div style={{ backgroundImage: `url(${song.image[1].url})` }} className="card_img">
                            <div className="card_btn">
                                <p style={{ textAlign: 'center' }} onClick={() => handlePlayBtn(song)}><i className={isCurrentActive && isPlaying ? "fa fa-pause" : "fa fa-play"}></i></p>
                                <div className="like_donlod">
                                    <p><i className="fa-regular fa-heart"></i></p>
                                    <p><i className="fa-solid fa-download"></i></p>
                                </div>
                            </div>
                            <div className="overlay"></div>
                        </div>
                        <div>
                            <h5 style={{ margin: '5px 0px 0px 0px' }}>{song.name}</h5>
                            <h6 style={{ margin: '0px 0px 5px 0px' }}>{song.artists.primary[0].name}</h6>
                            <small className="card_time" style={{ marginTop: '0px' }}>{song.duration}</small>
                        </div>
                        <br />
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default Cards;