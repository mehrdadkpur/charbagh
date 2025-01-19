import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

// Define custom styles for the modal
// Modal.setAppElement('#root');

const CustomAudioPlayer = ({ audioSrc, songTitle, songArtist }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        const updateCurrentTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleSeek = (event) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration * event.target.value) / 100;
    };

    const handleVolumeChange = (event) => {
        const audio = audioRef.current;
        audio.volume = event.target.value;
        setVolume(event.target.value);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className=" flex items-center gap-2.5 bg-[#333] p-2.5 rounded-sm text-white">
            <audio ref={audioRef} src={audioSrc} autoPlay={true}></audio>
            <button className=' bg-[#555] text-white border-none px-1 py-2.5 cursor-pointer rounded-sm hover:bg-[#777]' onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input className=' bg-[#555] text-white border-none px-1 py-2.5 cursor-pointer rounded-sm hover:bg-[#777]' type="range" value={(currentTime / duration) * 100} onChange={handleSeek} />
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
            <input type="range" value={volume} min="0" max="1" step="0.1" onChange={handleVolumeChange} />

            {/* <Modal contentLabel="Music Player" className=" absolute top-1/2 left-1/2 right-auto bottom-auto transform translate-x-1/2 translate-y-1/2 bg-transparent p-5 rounded-sm shadow-xl" overlayClassName="modal-overlay">
                <h2>{songTitle}</h2>
                <p>{songArtist}</p>
                <audio ref={audioRef} controls src={audioSrc} ></audio>
            </Modal> */}
        </div>
    );
};

export default CustomAudioPlayer;
