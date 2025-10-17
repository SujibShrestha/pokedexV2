"use client";
import { PauseIcon, Play } from "lucide-react";
import { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  if (audioRef.current) audioRef.current.volume = 0.07;

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} src="/pokesong.mp3" loop autoPlay />
      <button
        onClick={toggleAudio}
        className="mt-2 px-4 py-2  text-white rounded-lg "
      >
        {isPlaying ? <PauseIcon className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
      </button>
    </div>
  );
}
