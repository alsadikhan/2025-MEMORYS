import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon, Volume2, Download } from "lucide-react";
import { Song } from "@/types";


const PLAYLIST: Song[] = [
  {
    id: "1",
    title: "КАМИН",
    artist: "EMIN feat. JONY",
    url: "Musics/ask.mp3",
    cover: "Images/ask.png",
  },
  {
    id: "2",
    title: "No One Noticed",
    artist: "The Marías",
    url: "Musics/ask5.mp3",
    cover: "Images/ask1.jpeg",
  },
  {
    id: "3",
    title: " 'Stuck In The Middle",
    artist: "bell ratjanee",
    url: "Musics/ask4.mp3",
    cover: "Images/ask4.jpg",
  },
  {
    id: "4",
    title: "first i love you in voice",
    artist: "bell ratjanee",
    url: "Musics/ask2.mp3",
    cover: "Images/ask2.jpg",
  },
  {
    id: "5",
    title: "husband🥹",
    artist: "bell ratjanee",
    url: "Musics/ask3.mp3",
    cover: "Images/ask3.jpg",
  },
];

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentSong = PLAYLIST[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTime(0);
  };
  
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDownload = (e: React.MouseEvent, song: Song) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = song.url;
    link.download = `${song.title} - ${song.artist}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-5xl font-heading mb-2 text-primary">Our Symphony</h2>
        <p className="text-muted-foreground italic">The soundtrack of our love story</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="bg-white/40 backdrop-blur-2xl border-white/60 shadow-[0_20px_50px_rgba(236,72,153,0.15)] overflow-hidden rounded-[2.5rem] border-2">
          <CardContent className="p-8">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl mb-8 group">
              <motion.img 
                key={currentSong.id}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={currentSong.cover} 
                alt={currentSong.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {isPlaying && (
                <div className="absolute bottom-6 left-6 flex items-end gap-1.5 h-12">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-white/90 rounded-full"
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-lg hover:bg-white/30 transition-colors"
                onClick={(e) => handleDownload(e, currentSong)}
              >
                <Download className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="text-center mb-8">
              <motion.h3 
                key={`title-${currentSong.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-800 mb-1"
              >
                {currentSong.title}
              </motion.h3>
              <motion.p 
                key={`artist-${currentSong.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary font-medium text-lg"
              >
                {currentSong.artist}
              </motion.p>
            </div>
            
            <div className="space-y-8">
              <div className="relative px-2">
                <Slider 
                  value={[currentTime]} 
                  max={duration || 100} 
                  step={0.1}
                  onValueChange={handleSliderChange}
                  className="cursor-pointer"
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-muted-foreground tracking-tighter">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center px-6">
                <Button variant="ghost" size="icon" onClick={prevSong} className="hover:bg-primary/10 rounded-full w-12 h-12">
                  <SkipBack className="w-8 h-8 text-primary fill-primary/10" />
                </Button>
                
                <Button 
                  onClick={togglePlay}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-rose-500 hover:from-rose-600 hover:to-primary shadow-[0_15px_30px_rgba(236,72,153,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-90 border-4 border-white"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 md:w-10 md:h-10 fill-white text-white" />
                  ) : (
                    <Play className="w-8 h-8 md:w-10 md:h-10 fill-white text-white ml-2" />
                  )}
                </Button>
                
                <Button variant="ghost" size="icon" onClick={nextSong} className="hover:bg-primary/10 rounded-full w-12 h-12">
                  <SkipForward className="w-8 h-8 text-primary fill-primary/10" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-primary/60 mb-4 uppercase tracking-[0.2em] px-2">Your Favorites</h4>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {PLAYLIST.map((song, index) => (
              <motion.div 
                key={song.id}
                whileHover={{ x: 10 }}
                className={`flex items-center p-4 rounded-[1.5rem] transition-all group ${
                  index === currentSongIndex ? "bg-primary text-white shadow-xl shadow-primary/30" : "bg-white/40 hover:bg-white/60 backdrop-blur-sm cursor-pointer"
                }`}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                }}
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden mr-4 shadow-lg border-2 border-white/20">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-lg font-bold truncate ${index === currentSongIndex ? "text-white" : "text-gray-800"}`}>
                    {song.title}
                  </p>
                  <p className={`text-sm truncate ${index === currentSongIndex ? "text-white/80" : "text-primary/70"}`}>
                    {song.artist}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {index === currentSongIndex && isPlaying && (
                    <div className="flex gap-0.5 h-4 items-end">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-current rounded-full"
                          animate={{ height: ["30%", "100%", "30%"] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 rounded-full transition-all ${index === currentSongIndex ? "hover:bg-white/20 text-white" : "text-primary hover:bg-primary/10"}`}
                    onClick={(e) => handleDownload(e, song)}
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
