import React, { useContext, useEffect } from 'react'
import { AudioContext } from '../../AudioContext';


function MusicBar() {
  const { currentTrack, isPlaying, togglePlayPause, handleNext, handlePrev, handleSeek, duration, currentTime, handleVolume, songVolume } = useContext(AudioContext);

  function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }


  if (!currentTrack) return null;
  return (
    <div className='bg-neutral-900 sticky bottom-0 text-white'>
      <div className='flex flex-wrap p-2.5 justify-around w-full min-h-32 h-fit items-center'>
        <div className='flex w-70'>
          <img width='50px' src={currentTrack.image?.[1].url || "https://placehold.co/50"} alt="" />
          <div className='content-end leading-4 pl-2'>
            <h5 className='clamp'>{currentTrack.name}</h5>
            <small>{currentTrack.artists?.primary?.[0]?.name}</small>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center sm:w-2/5'>

          <div className='flex gap-7.5 items-center mb-2'>
            <p className='cursor-pointer m-0' style={{ fontSize: '1.1rem' }} onClick={handlePrev}>
              <i className='fa-solid fa-backward hover:text-gray-400'></i>
            </p>
            <p className='cursor-pointer m-0' style={{ fontSize: '1.5rem' }} onClick={togglePlayPause}>
              <i className={isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i>
            </p>
            <p className='cursor-pointer m-0' style={{ fontSize: '18px' }} onClick={handleNext}>
              <i className='fa-solid fa-forward hover:text-gray-400'></i>
            </p>
          </div>

          <div className='flex items-center gap-2.5 w-full' style={{ fontSize: '12px', color: '#a3a3a3' }}>
            <span>{formatTime(currentTime)}</span>
            <input className='w-full cursor-pointer'
              type="range"
              min='0'
              max={duration || 0}
              value={currentTime || 0}
              onChange={(e) => handleSeek(e.target.value)}
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>
        <div className='flex justify-between'>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <p style={{ margin: 0, width: '20px', textAlign: 'center' ,cursor:'pointer'}}><i className='fa-regular fa-heart'></i></p>
          </div > */}
          <div className='flex items-center'>
            <p className='inline-block'><i onClick={() => handleVolume(songVolume ? 0 : 100)} className={`fa-solid ${songVolume ? `${songVolume < 50 ? 'fa-volume-low' : 'fa-volume-high'}` : 'fa-volume-xmark'}`}></i></p>
            <input type="range" max='100' onChange={(e) => { handleVolume(e.target.value) }} value={songVolume} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicBar