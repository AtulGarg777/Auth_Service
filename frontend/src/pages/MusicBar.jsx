import React, { useContext, useEffect } from 'react'
import { AudioContext } from '../../AudioContext';


function MusicBar() {
  const { currentTrack, isPlaying, togglePlayPause, handleNext, handlePrev, handleSeek, duration, currentTime } = useContext(AudioContext);

  function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  

  if (!currentTrack) return null;
  return (
    <div style={{ position: 'sticky', bottom: '0px' }}>
      <div className='botm_bar'>
        <div className='botm_song_info'>
          <img width='50px' src={currentTrack.image?.[1].url || "https://placehold.co/50"} alt="" />
          <div>
            <h5>{currentTrack.name}</h5>
            <small>{currentTrack.artists?.primary?.[0]?.name}</small>
          </div>
        </div>
        <div>
          <span>{formatTime(currentTime)}</span>
          <input type="range" min='0' max={duration} value={currentTime} onChange={(e) => handleSeek(e)} />
          <span>{formatTime(duration)}</span>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <p style={{ cursor: 'pointer' }} onClick={handlePrev}><i className='fa-solid fa-backward'></i></p>
            <p style={{ cursor: 'pointer' }} onClick={togglePlayPause}><i className={isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i></p>
            <p style={{ cursor: 'pointer' }} onClick={handleNext}><i className='fa-solid fa-forward'></i></p>
          </div>
        </div>
        <div className='botm_heart_sound'>
          {/* <div>
            <p style={{cursor:'pointer'}}><i className='fa-regular fa-heart'></i></p>
          </div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ display: 'inline-block' }}><i className='fa-solid fa-volume-high'></i></p>
            <input type="range" max='100' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicBar