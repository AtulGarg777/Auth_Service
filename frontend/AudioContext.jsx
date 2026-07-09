import { createContext, useRef, useState, useEffect } from "react";
import React from 'react'

export const AudioContext = createContext();


export function AudioProvider({ children }) {

    let [currentTrack, setCurrentTrack] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [queue, setQueue] = useState([]);
    let [currentInd, setCurrentInd] = useState(-1);
    let [currentTime, setCurrentTime] = useState(0);
    let [duration, setDuration] = useState(0);
    let [songVolume, setSongVolume] = useState(100);

    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio();

        const onEndListener = () => {
            console.log("song ended");
            handleNext();
        }

        const ontimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime)
        }

        const onLoadMetaData = () => {
            setDuration(audioRef.current.duration), console.log(audioRef.current);
        }

        audioRef.current.addEventListener('ended', onEndListener);

        audioRef.current.addEventListener('timeupdate', ontimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', onLoadMetaData);



        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.removeEventListener('timeupdate', ontimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', onLoadMetaData);
            }
        }
    }, [currentInd,queue]);

    const handleSeek = (newTime) => {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolume = (vol) => {
        audioRef.current.volume = parseFloat(vol / 100);
        setSongVolume(vol)
    }

    const playTrack = (track, trackList = []) => {
        if (trackList.length > 0) {
            setQueue(trackList);
            const index = trackList.findIndex((t) => t.id === track.id);
            setCurrentInd(index);
        }

        if (!currentTrack || currentTrack.id !== track.id) {
            audioRef.current.src = track.downloadUrl[track.downloadUrl.length - 1].url;
            setCurrentTrack(track);
        }

        audioRef.current.play();
        setIsPlaying(true);
    };

    function togglePlayPause() {
        if (!currentTrack) {
            return;
        }

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    function handleNext() {
        try {
            // console.log("called");
            console.log(queue, currentInd);

            if (queue.length == 0 || currentInd == -1) return;

            let nextInd = (currentInd + 1) % queue.length;
            setCurrentInd(nextInd);
            // console.log("first");

            let nextTrack = queue[nextInd];

            audioRef.current.src = nextTrack.downloadUrl[nextTrack.downloadUrl.length - 1].url;
            setCurrentTrack(nextTrack);
            audioRef.current.play();
            setIsPlaying(true);
            // console.log(nextInd,currentTrack);
            // console.log("dfgf");
        }
        catch (err) {
            console.log(err);

        }

    }

    function handlePrev() {
        if (queue.length == 0 || currentInd == -1) return

        const prevInd = currentInd == 0 ? queue.length - 1 : currentInd - 1;
        setCurrentInd(prevInd);

        const prevTrack = queue[prevInd];
        audioRef.current.src = prevTrack.downloadUrl[prevTrack.downloadUrl.length - 1].url;
        setCurrentTrack(prevTrack);
        audioRef.current.play();
        setIsPlaying(true);
    }

    return (
        <AudioContext.Provider value={{ currentTrack, currentInd, isPlaying, handleNext, handlePrev, queue, playTrack, togglePlayPause, handleSeek, currentTime, duration, handleVolume, songVolume }}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioProvider
