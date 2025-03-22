'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  color: string;
}

interface MusicPlayerProps {
  onSongChange?: (src: string, color?: string) => void;
  onTogglePlay?: (isPlaying: boolean) => void;
  initialSong?: string;
}

const defaultSongs: Song[] = [
  {
    id: 'light-of-you',
    title: 'Light of You',
    artist: 'Swif7',
    src: '/audio/music/ES_Light of You - Swif7.mp3',
    color: '#00aaff',
  },
  {
    id: 'dont-want-it',
    title: 'Don\'t Want It',
    artist: 'Hallman',
    src: '/audio/music/ES_Don\'t Want It - Hallman.mp3',
    color: '#a855f7',
  },
  {
    id: 'look-to-the-future',
    title: 'Look to the Future',
    artist: 'Purple Dive',
    src: '/audio/music/ES_Look to the Future - Purple Dive.mp3',
    color: '#10b981',
  },
  {
    id: 'taint',
    title: 'Taint',
    artist: 'Hampus Naeselius',
    src: '/audio/music/ES_Taint - Hampus Naeselius.mp3',
    color: '#ec4899',
  },
  {
    id: 'wish-you-well',
    title: 'Wish You Well',
    artist: 'Purple Dive',
    src: '/audio/music/ES_Wish You Well - Purple Dive.mp3',
    color: '#f97316',
  }
];

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onSongChange,
  onTogglePlay,
  initialSong = 'light-of-you',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(initialSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentSong = defaultSongs.find(song => song.id === currentSongId) || defaultSongs[0];

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
      const currentIndex = defaultSongs.findIndex(song => song.id === currentSongId);
      const nextIndex = (currentIndex + 1) % defaultSongs.length;
      setCurrentSongId(defaultSongs[nextIndex].id);
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
  }, [currentSongId]);

  // Handle song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      console.log("Changing song to:", currentSong.title);
      
      // Update audio source to the current song
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
      
      // Notify parent component about song change - pass both src and color
      if (onSongChange) {
        console.log("Notifying parent of song change:", currentSong.src, currentSong.color);
        onSongChange(currentSong.src, currentSong.color);
      }
      
      // Only attempt to play if already playing
      if (isPlaying) {
        console.log("Song changed while playing, attempting to play new song");
        // Defer playing to next tick to ensure the audio is loaded
        setTimeout(() => {
          console.log("Attempting to play after song change");
          audioRef.current?.play()
            .catch(err => {
              console.error('Failed to play audio after song change:', err instanceof Error ? err.message : 'Unknown error');
              setIsPlaying(false);
              if (onTogglePlay) onTogglePlay(false);
            });
        }, 100);
      }
    }
  }, [currentSong, onSongChange, isPlaying, onTogglePlay]);

  // Handle play/pause changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (isPlaying) {
      try {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Failed to play audio:', err instanceof Error ? err.message : 'Playback blocked');
            setIsPlaying(false);
            if (onTogglePlay) onTogglePlay(false);
          });
        }
      } catch (error) {
        console.error('Error during audio playback:', error instanceof Error ? error.message : 'Unknown error');
        setIsPlaying(false);
        if (onTogglePlay) onTogglePlay(false);
      }
    } else {
      try {
        audio.pause();
      } catch (error) {
        console.error('Error pausing audio:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    // Notify parent component about play state change
    if (onTogglePlay) {
      onTogglePlay(isPlaying);
    }
    
    // Event listeners for error handling
    const handleError = (e: ErrorEvent) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
      if (onTogglePlay) onTogglePlay(false);
    };
    
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, [isPlaying, onTogglePlay]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    console.log(`Toggling play/pause state from ${isPlaying ? 'playing' : 'paused'} to ${!isPlaying ? 'playing' : 'paused'}`);
    setIsPlaying(!isPlaying);
  };

  const handlePrevSong = () => {
    const currentIndex = defaultSongs.findIndex(song => song.id === currentSongId);
    const prevIndex = (currentIndex - 1 + defaultSongs.length) % defaultSongs.length;
    setCurrentSongId(defaultSongs[prevIndex].id);
  };

  const handleNextSong = () => {
    const currentIndex = defaultSongs.findIndex(song => song.id === currentSongId);
    const nextIndex = (currentIndex + 1) % defaultSongs.length;
    setCurrentSongId(defaultSongs[nextIndex].id);
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
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="z-30">
      <audio ref={audioRef} src={currentSong.src} className="hidden" preload="metadata" />
      
      <AnimatePresence>
        <motion.div 
          className="relative bg-black/60 backdrop-blur-md rounded-lg text-white overflow-hidden"
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
            className="absolute top-2 right-2 bg-transparent w-8 h-8 rounded-full flex items-center justify-center z-20"
            aria-label={expanded ? "Collapse player" : "Expand player"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Mini player (always visible) */}
          <motion.div 
            className="absolute top-0 left-0 w-[60px] h-[60px] bg-black/80 rounded-lg overflow-hidden flex items-center justify-center z-10"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                togglePlayPause();
              }}
              className="w-full h-full flex items-center justify-center"
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
          </motion.div>
          
          {/* Expanded player content */}
          {expanded && (
            <div className="pt-[70px] p-4 h-full flex flex-col">
              {/* Album art */}
              <div className="w-full aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                
                {/* Color placeholder instead of image */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: currentSong.color }}
                >
                  <span className="text-white text-5xl font-bold opacity-50">
                    {currentSong.title.charAt(0)}
                  </span>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ 
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{ 
                      duration: 20, 
                      ease: "linear", 
                      repeat: Infinity 
                    }}
                    className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                </div>
              </div>
              
              {/* Song info */}
              <div className="mb-4 text-center">
                <h3 className="text-lg font-bold truncate">{currentSong.title}</h3>
                <p className="text-sm text-zinc-400">{currentSong.artist}</p>
              </div>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div 
                  ref={progressRef}
                  className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden cursor-pointer"
                  onClick={handleProgressClick}
                  aria-label="Song progress"
                  role="progressbar"
                  aria-valuenow={(currentTime / duration) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-zinc-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={handlePrevSong}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition"
                  aria-label="Previous song"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    togglePlayPause();
                  }}
                  className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition"
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
                
                <button 
                  onClick={handleNextSong}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition"
                  aria-label="Next song"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Volume control */}
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 014.031 1.088l-2.1 2.1A3.98 3.98 0 0012 8.75c-1.017 0-1.954.383-2.662 1.013l-2.1-2.1A7.975 7.975 0 0112 6zm4.031 10.912A7.975 7.975 0 0112 18a7.975 7.975 0 01-4.031-1.088l2.1-2.1A3.983 3.983 0 0012 15.25c1.017 0 1.954-.383 2.662-1.013l2.1 2.1z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  aria-label="Volume control"
                />
              </div>
              
              {/* Song list */}
              <div className="mt-4 flex-1 overflow-y-auto">
                <h4 className="text-xs uppercase text-zinc-500 mb-2">Tracks</h4>
                <div className="space-y-1">
                  {defaultSongs.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => setCurrentSongId(song.id)}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition ${
                        currentSongId === song.id 
                          ? 'bg-white/10 text-white' 
                          : 'hover:bg-white/5 text-zinc-400'
                      }`}
                      aria-label={`Play ${song.title} by ${song.artist}`}
                      aria-current={currentSongId === song.id ? 'true' : 'false'}
                    >
                      <div className="w-8 h-8 rounded-md flex-shrink-0" style={{ backgroundColor: song.color }}>
                        {currentSongId === song.id && isPlaying ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="flex items-end h-4 space-x-[2px]">
                              <div className="w-1 h-3 bg-blue-500 animate-pulse-slow" />
                              <div className="w-1 h-4 bg-purple-500 animate-pulse-slower" />
                              <div className="w-1 h-2 bg-blue-500 animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{song.title.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="truncate font-medium text-sm">{song.title}</p>
                        <p className="truncate text-xs opacity-70">{song.artist}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer; 