'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Track } from '@/lib/audio-tracks';

interface MusicPlayerProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: (isPlaying: boolean) => void;
  onTrackChange: (track: Track) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayPause,
  onTrackChange
}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Setup audio event listeners
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      // Play next song
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      onTrackChange(tracks[nextIndex]);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    // Set initial volume
    audio.volume = volume;
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack.id, tracks, onTrackChange]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      // Update audio source to the current track
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      
      // Only attempt to play if already playing
      if (isPlaying) {
        // Defer playing to next tick to ensure the audio is loaded
        setTimeout(() => {
          audioRef.current?.play()
            .catch(err => {
              console.error('Failed to play audio after track change:', err);
              onPlayPause(false);
            });
        }, 100);
      }
    }
  }, [currentTrack.src, isPlaying, onPlayPause]);

  // Handle play/pause changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (isPlaying) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error('Failed to play audio:', err);
          onPlayPause(false);
        });
      }
    } else {
      audio.pause();
    }
    
  }, [isPlaying, onPlayPause]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    onPlayPause(!isPlaying);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    onTrackChange(tracks[prevIndex]);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    onTrackChange(tracks[nextIndex]);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const percentClick = clickPosition / progressRect.width;
    const newTime = percentClick * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="z-50">
      <audio ref={audioRef} src={currentTrack.src} className="hidden" preload="metadata" />
      
      <motion.div 
        className="relative bg-black/80 backdrop-blur-md rounded-lg text-white overflow-hidden shadow-xl border border-white/10"
        initial={{ width: '60px', height: '60px' }}
        animate={{ 
          width: expanded ? '320px' : '60px',
          height: expanded ? '400px' : '60px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute top-2 right-2 bg-transparent w-8 h-8 rounded-full flex items-center justify-center z-20 hover:bg-white/10"
          aria-label={expanded ? "Collapse player" : "Expand player"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {expanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>

        {/* Collapsed state (just play/pause) */}
        {!expanded && (
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${currentTrack.color}33` }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        )}

        {/* Expanded state content (visible only when expanded) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header with current track info */}
              <div className="p-4 flex-none">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold">Music Player</h3>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentTrack.color }}
                  />
                </div>
                <div 
                  className="rounded-md p-3 mb-2"
                  style={{ backgroundColor: `${currentTrack.color}33` }}
                >
                  <div className="font-bold truncate" style={{ color: currentTrack.color }}>
                    {currentTrack.title}
                  </div>
                  <div className="text-sm text-gray-300 truncate">{currentTrack.artist}</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="px-4 mb-4 flex-none">
                <div 
                  ref={progressRef}
                  className="h-2 bg-gray-700 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(currentTime / duration) * 100}%`,
                      backgroundColor: currentTrack.color
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="px-4 mb-4 flex items-center justify-center space-x-4 flex-none">
                <button
                  onClick={handlePrevTrack}
                  className="p-2 rounded-full hover:bg-white/10"
                  aria-label="Previous track"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className={`p-3 rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: `${currentTrack.color}55` }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                <button
                  onClick={handleNextTrack}
                  className="p-2 rounded-full hover:bg-white/10"
                  aria-label="Next track"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Volume control */}
              <div className="px-4 mb-4 flex items-center space-x-2 flex-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${currentTrack.color} 0%, ${currentTrack.color} ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
              </div>
              
              {/* Playlist */}
              <div className="flex-grow overflow-y-auto px-4 py-2">
                <h4 className="font-bold text-sm mb-2 text-gray-400">Playlist</h4>
                <div className="space-y-1">
                  {tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => onTrackChange(track)}
                      className={`w-full text-left p-2 rounded-md flex items-center ${
                        track.id === currentTrack.id ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-2 flex-none"
                        style={{ backgroundColor: track.color }}
                      />
                      <div className="overflow-hidden">
                        <div className="truncate text-sm">{track.title}</div>
                        <div className="truncate text-xs text-gray-400">{track.artist}</div>
                      </div>
                      {track.id === currentTrack.id && isPlaying && (
                        <div className="ml-auto">
                          <div className="flex gap-0.5">
                            <div className="w-1 h-3 bg-white/70 rounded-sm animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-4 bg-white/70 rounded-sm animate-pulse" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-1 h-2 bg-white/70 rounded-sm animate-pulse" style={{ animationDelay: '400ms' }}></div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 