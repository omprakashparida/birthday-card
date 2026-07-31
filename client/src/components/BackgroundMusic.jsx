import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useState,
    useEffect,
  } from "react";
  
  const BackgroundMusic = forwardRef(({ src }, ref) => {
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(false);
  
    useImperativeHandle(ref, () => ({
      async play() {
        if (!audioRef.current || !src) return;
  
        try {
          await audioRef.current.play();
        } catch (err) {
          console.warn("Unable to play background music:", err);
        }
      },
  
      pause() {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      },
  
      stop() {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      },
  
      toggleMute() {
        setMuted((prev) => !prev);
      },
  
      isMuted() {
        return muted;
      },
    }));
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.muted = muted;
      }
    }, [muted]);
  
    if (!src) return null;

    return (
      <>
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          loop
        />
  
        <button
          onClick={() => setMuted((prev) => !prev)}
          className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle Music"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </>
    );
  });
  
  BackgroundMusic.displayName = "BackgroundMusic";
  
  export default BackgroundMusic;