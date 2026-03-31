"use client";

import React, { useState, useRef, useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleStartAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => {
          console.warn("Autoplay blocked by browser. User must interact to hear music.");
        });
      }
    };

    const handleWarmupAudio = () => {
      if (audioRef.current) {
        // iOS Safari critical: must call play() during a user gesture to "unlock" the audio element
        // for later automated playback (even with a delay).
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Immediately pause so it doesn't actually start yet, but is now "unlocked"
              audioRef.current?.pause();
            })
            .catch((error) => {
              console.warn("Audio warmup failed:", error);
            });
        }
      }
    };

    window.addEventListener("play_wedding_music", handleStartAudio);
    window.addEventListener("warmup_audio", handleWarmupAudio);
    
    return () => {
      window.removeEventListener("play_wedding_music", handleStartAudio);
      window.removeEventListener("warmup_audio", handleWarmupAudio);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-6 md:right-12 z-[120] flex items-center gap-2.5">
      {/* Visualizer / Playing Indicator */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-2.5 mb-0.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[1.5px] bg-olive/40 animate-pulse"
              style={{
                height: `${Math.random() * 100 + 10}%`,
                animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Play/Pause Button (Smaller & Discrete) */}
      <button
        onClick={togglePlay}
        className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-olive/15 hover:border-burgundy/30 bg-surface/30 backdrop-blur-md transition-all duration-700 focus:outline-none"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        <div className={`transition-all duration-700 ${isPlaying ? 'rotate-90 text-burgundy' : 'text-olive'}`}>
          {isPlaying ? (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        
        {/* Subtle hover pulse */}
        <div className="absolute inset-0 rounded-full bg-burgundy/5 scale-0 group-hover:scale-110 transition-transform duration-700" />
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/Norah Jones - Don't Know Why.mp4"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
