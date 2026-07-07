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
        try {
            async function fetchSongs() {
                let response = await songFromApi(query, limit);
                if (response == null) {
                    throw new Error("Error Occured During Fetching Songs");
                    return;
                }
                setTrendingSongs(response);
                setIsLoading(false);
            }
            fetchSongs();
        } catch (err) {
            console.log("error :", err);
        }
    }, [query, limit])

    function formatTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds % 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 justify-items-center py-5 shadow-xl/20">
                {isLoading ? <p>Loading...</p> : trendingSongs.map((song, ind) => {
                    const isCurrentActive = currentTrack && currentTrack.id == song.id;

                    return (<div className="max-w-[7rem] sm:max-w-[9.3rem] h-fit shadow-xl/50" key={ind}>
                        <div className="bg-cover sm:h-[9.3rem] h-[7rem] min-w-[7rem] sm:w-[9.3rem]" style={{ backgroundImage: `url(${song.image[1].url})` }} >
                            <div>
                                <p onClick={() => handlePlayBtn(song)} className="cursor-pointer"><i className={`${isCurrentActive && isPlaying ? "fa fa-pause" : "fa fa-play"} bg-red-400 p-3.5 shadow-2xl/20`}></i></p>
                                <div>
                                    {/* <p><i className="fa-regular fa-heart"></i></p> */}
                                    {/* <p><i className="fa-solid fa-download"></i></p> */}
                                </div>
                            </div>
                        </div>
                        <div >
                            <h5 className="clamp">{song.name}</h5>
                            <h6 className="flex justify-between">{song.artists.primary[0].name}
                                <span className="text-neutral-500">{formatTime(song.duration)}</span>
                            </h6>

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