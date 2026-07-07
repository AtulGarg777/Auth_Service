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
      <div className='flex justify-around w-full h-32 items-center'>
        <div className='flex w-70'>
          <img width='50px' src={currentTrack.image?.[1].url || "https://placehold.co/50"} alt="" />
          <div className='content-end leading-4 pl-2'>
            <h5 className='clamp'>{currentTrack.name}</h5>
            <small>{currentTrack.artists?.primary?.[0]?.name}</small>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-2/5'>

          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '8px' }}>
            <p style={{ cursor: 'pointer', margin: 0, fontSize: '18px' }} onClick={handlePrev}>
              <i className='fa-solid fa-backward hover:text-gray-400'></i>
            </p>
            <p style={{ cursor: 'pointer', margin: 0, fontSize: '24px' }} onClick={togglePlayPause}>
              <i className={isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i>
            </p>
            <p style={{ cursor: 'pointer', margin: 0, fontSize: '18px' }} onClick={handleNext}>
              <i className='fa-solid fa-forward hover:text-gray-400'></i>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', fontSize: '12px', color: '#a3a3a3' }}>
            <span>{formatTime(currentTime)}</span>
            <input
              style={{ width: '100%', cursor: 'pointer' }}
              type="range"
              min='0'
              max={duration || 0}
              value={currentTime || 0}
              onChange={(e) => handleSeek(e.target.value)}
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>
        <div className='flex justify-between w-70'>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <p style={{ margin: 0, width: '20px', textAlign: 'center' ,cursor:'pointer'}}><i className='fa-regular fa-heart'></i></p>
          </div > */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ display: 'inline-block' }}><i className={`fa-solid ${songVolume ? `${songVolume < 50 ? 'fa-volume-low' : 'fa-volume-high'}` : 'fa-volume-xmark'}`}></i></p>
            <input type="range" max='100' onChange={(e) => { handleVolume(e) }} value={songVolume} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicBar