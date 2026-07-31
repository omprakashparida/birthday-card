import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      isHeart: i % 4 === 0,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 12,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute drop-shadow-sm"
          style={{ top: p.top, left: p.left, fontSize: p.size }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.7, 0], y: -30 }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.isHeart ? (
            <span className="text-rose-300">❤️</span>
          ) : (
            <span className="text-amber-300">✦</span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const LetterContent = ({ message, senderName }) => {
  const [typedText, setTypedText] = useState("");
  const [step, setStep] = useState(0); 
  const containerRef = useRef(null);

  useEffect(() => {
    const initialDelay = setTimeout(() => setStep(1), 400);
    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (step === 1) {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setTypedText(message.slice(0, index));
        
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        if (index >= message.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 600);
        }
      }, 35);
      
      return () => clearInterval(interval);
    }
  }, [step, message]);

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-[#fffdf8]">
      <div className="w-full h-full border-[1.5px] border-dashed border-rose-200/80 rounded-xl relative overflow-hidden flex flex-col">
        <div 
          ref={containerRef}
          className="w-full h-full overflow-y-auto px-5 py-8 sm:px-8 sm:py-10 custom-scrollbar flex flex-col relative"
        >
          {/* Top Decorative Flourish for perfect symmetry */}
          <div className="w-full flex justify-center mb-6 opacity-60 shrink-0">
            <span className="text-rose-400 text-2xl drop-shadow-sm">❦</span>
          </div>

          <div className="flex-1">
            <p className="text-slate-700 text-[15px] sm:text-[17px] leading-[2.2] sm:leading-[2.4] whitespace-pre-wrap font-serif tracking-wide text-center sm:text-left">
              {typedText}
              {step === 1 && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[2px] h-[1em] bg-rose-400 align-middle ml-1"
                />
              )}
            </p>
          </div>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 pt-6 border-t border-rose-200/50 flex flex-col items-center sm:items-end shrink-0"
              >
                <p className="text-rose-400 italic text-sm sm:text-base font-medium mb-1">
                  With love,
                </p>
                <p className="text-rose-600 italic text-xl sm:text-2xl font-bold font-serif">
                  {senderName} ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const LoveLetter = ({
  senderName = "Someone Special",
  message = "Happy Birthday! May your day be filled with joy, love, and countless beautiful moments. You mean the world to me and I hope all your wishes come true today.",
}) => {
  const [phase, setPhase] = useState("closed");

  const handleOpen = () => {
    if (phase !== "closed") return;
    
    setPhase("opening");
    
    setTimeout(() => {
      setPhase("expanding");
    }, 1100);

    setTimeout(() => {
      setPhase("reading");
    }, 2000);
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[500px] overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center font-serif">
      <BackgroundParticles />

      <AnimatePresence>
        {phase === "closed" && (
          <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[10dvh] sm:top-[12%] flex flex-col items-center text-center px-4 z-10 w-full"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 italic mb-2 drop-shadow-sm">
              A Message From My Heart 💌
            </h1>
            <p className="text-sm sm:text-base text-rose-400 font-medium tracking-wide">
              Tap the envelope to open
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute z-30 flex items-center justify-center"
        animate={
          phase === "closed" || phase === "opening"
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: "15dvh", filter: "blur(10px)" }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div 
          className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[210px] cursor-pointer" 
          onClick={handleOpen}
          style={{ perspective: 1200 }}
        >
          <div className="absolute inset-0 bg-[#fbcfe8] rounded-md shadow-xl z-10" />
          <svg viewBox="0 0 320 210" className="absolute inset-0 w-full h-full z-30 pointer-events-none drop-shadow-md">
            <path d="M 0,0 L 160,110 L 320,0 L 320,210 L 0,210 Z" fill="#f9a8d4" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 0,210 L 160,110 L 320,210" fill="#f472b6" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <motion.div
            className="absolute top-0 left-0 w-full h-[120px] sm:h-[130px] z-40 pointer-events-none"
            style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: phase !== "closed" ? 175 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 320 130" className="w-full h-full drop-shadow-sm" style={{ backfaceVisibility: "hidden" }}>
              <path d="M 0,0 L 160,110 L 320,0 Z" fill="#f472b6" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <svg viewBox="0 0 320 130" className="w-full h-full absolute top-0 left-0" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
              <path d="M 0,0 L 160,110 L 320,0 Z" fill="#fbcfe8" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

            <AnimatePresence>
              {phase === "closed" && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 bottom-2 -translate-x-1/2 translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-rose-700 rounded-full shadow-lg flex items-center justify-center border-2 border-rose-800/50"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 border border-rose-400/40 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-sm sm:text-base">⚜</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bg-[#fffdf8] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-rose-100"
        initial={{ width: 270, height: 170, y: 0, zIndex: 20 }}
        animate={
          phase === "closed" 
            ? { width: 270, height: 170, y: 0, zIndex: 20 } 
            : phase === "opening" 
            ? { width: 270, height: 170, y: -40, zIndex: 20 } 
            : { width: "92vw", maxWidth: 540, height: "75dvh", maxHeight: 720, y: "0dvh", zIndex: 50 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {phase === "reading" && (
          <LetterContent 
            message={message} 
            senderName={senderName} 
          />
        )}
      </motion.div>
    </div>
  );
};

export default LoveLetter;