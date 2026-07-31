import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlowCandle = ({ receiverName, onComplete }) => {
  const [isBlown, setIsBlown] = useState(false);

  const bgParticles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      isHeart: i % 4 === 0,
      top: `${10 + Math.random() * 80}%`,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 10 + Math.random() * 12,
    }));
  }, []);

  const explosionParticles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      distance: 60 + Math.random() * 60,
      delay: Math.random() * 0.2,
      isHeart: i % 3 === 0,
      color: ["#f9a8d4", "#fde047", "#a7f3d0", "#c4b5fd"][i % 4],
    }));
  }, []);

  const handleBlow = () => {
    if (!isBlown) setIsBlown(true);
  };

  return (
    <div className="relative w-full min-h-[500px] sm:min-h-[600px] bg-gradient-to-b from-pink-50 to-rose-100 rounded-3xl overflow-hidden flex flex-col items-center justify-center px-6 py-12">
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {bgParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute drop-shadow-sm"
            style={{ top: p.top, left: p.left, fontSize: p.size }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.6, 0], y: -20 }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {p.isHeart ? "💖" : <span className="text-amber-300">✦</span>}
          </motion.div>
        ))}
      </div>

      <div className="z-20 flex flex-col items-center h-16 sm:h-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={isBlown ? "blown-title" : "lit-title"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-serif font-bold text-rose-500 text-center drop-shadow-sm"
          >
            {isBlown ? "Hope all your wishes come true! 💖" : `Blow the candle, ${receiverName || "Friend"} 💕`}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence>
          {!isBlown && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-base text-rose-400 font-medium text-center mt-2 tracking-wide"
            >
              Tap the candle to blow it and make a wish ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative flex justify-center mt-8 mb-6 z-10"
        animate={isBlown ? { y: [0, 12, -6, 0], scale: [1, 1.03, 0.97, 1] } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg viewBox="0 0 300 200" className="w-72 sm:w-96 h-auto drop-shadow-xl pointer-events-none">
          <defs>
            <linearGradient id="cakeSponge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6E4527" />
              <stop offset="100%" stopColor="#4A2E1B" />
            </linearGradient>
            <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fef9c3" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          <ellipse cx="150" cy="180" rx="125" ry="16" fill="#d49a9e" opacity="0.4" />
          <ellipse cx="150" cy="170" rx="135" ry="22" fill="#ffffff" />
          <ellipse cx="150" cy="173" rx="135" ry="22" fill="#f4f4f5" />
          <path d="M 50 100 L 50 155 A 100 25 0 0 0 250 155 L 250 100 A 100 25 0 0 1 50 100 Z" fill="url(#cakeSponge)" />
          <path d="M 50 100 A 100 25 0 0 0 250 100 A 100 25 0 0 1 50 100 Z" fill="#5C3A21" />
          
          <ellipse cx="150" cy="100" rx="100" ry="25" fill="#fbcfe8" />
          <path d="M 50 100 C 50 115, 60 120, 75 110 C 85 140, 105 135, 115 115 C 125 150, 145 150, 160 120 C 175 160, 205 145, 215 115 C 225 130, 240 125, 250 100 A 100 25 0 0 1 50 100 Z" fill="#fbcfe8" />

          <g>
            <rect x="95" y="92" width="10" height="3.5" rx="1.5" transform="rotate(25 95 92)" fill="#38bdf8" />
            <rect x="125" y="105" width="10" height="3.5" rx="1.5" transform="rotate(-40 125 105)" fill="#fbbf24" />
            <rect x="175" y="95" width="10" height="3.5" rx="1.5" transform="rotate(15 175 95)" fill="#a78bfa" />
            <rect x="190" y="112" width="10" height="3.5" rx="1.5" transform="rotate(65 190 112)" fill="#34d399" />
            <rect x="150" y="85" width="10" height="3.5" rx="1.5" transform="rotate(-15 150 85)" fill="#fb7185" />
            <rect x="110" y="112" width="10" height="3.5" rx="1.5" transform="rotate(-55 110 112)" fill="#818cf8" />
            <rect x="210" y="98" width="10" height="3.5" rx="1.5" transform="rotate(45 210 98)" fill="#f472b6" />
            <rect x="75" y="105" width="10" height="3.5" rx="1.5" transform="rotate(-10 75 105)" fill="#fbbf24" />
            <rect x="160" y="115" width="10" height="3.5" rx="1.5" transform="rotate(-25 160 115)" fill="#38bdf8" />
            <rect x="135" y="90" width="10" height="3.5" rx="1.5" transform="rotate(35 135 90)" fill="#34d399" />
          </g>

          <rect x="144" y="45" width="12" height="65" rx="3" fill="url(#candleGrad)" />
          <path d="M144 55 L156 48 M144 65 L156 58 M144 75 L156 68 M144 85 L156 78 M144 95 L156 88 M144 105 L156 98" stroke="#f472b6" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
          <rect x="149" y="38" width="2" height="7" fill="#4b5563" />
        </svg>

        <div
          className="absolute top-[19%] left-1/2 -translate-x-1/2 -translate-y-full w-24 h-28 flex flex-col justify-end items-center cursor-pointer z-30 pb-[2px]"
          onClick={handleBlow}
        >
          <AnimatePresence>
            {!isBlown && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative flex flex-col items-center justify-end w-full h-full"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute bottom-1 w-12 h-12 bg-yellow-400/40 blur-md rounded-full pointer-events-none"
                />
                
                <motion.div
                  animate={{ scaleY: [1, 1.1, 0.95, 1.05, 1], rotate: [0, -3, 3, -1, 0], x: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="absolute bottom-1 w-5 h-9 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-200"
                  style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", transformOrigin: "bottom center" }}
                />
                
                <motion.div
                  animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], rotate: [0, 2, -2, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="absolute bottom-1.5 w-2 h-4 bg-gradient-to-t from-yellow-100 to-white"
                  style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", transformOrigin: "bottom center" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isBlown && [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: "-50%", scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.7, 0], 
                  y: -60 - i * 30, 
                  x: `calc(-50% + ${i % 2 === 0 ? 15 : -15}px)`, 
                  scale: 2.5 
                }}
                transition={{ duration: 2.2, delay: i * 0.2, ease: "easeOut" }}
                className="absolute bottom-1 left-1/2 w-4 h-4 bg-gray-400/50 blur-[3px] rounded-full pointer-events-none"
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isBlown && (
              <div className="absolute bottom-0 left-1/2 z-40 pointer-events-none">
                {explosionParticles.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                      x: Math.cos(p.angle) * p.distance,
                      y: Math.sin(p.angle) * p.distance,
                      opacity: 0,
                      scale: p.isHeart ? 1.4 : 0.8
                    }}
                    transition={{ duration: 1, delay: p.delay, ease: "easeOut" }}
                    className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  >
                    {p.isHeart ? (
                      <span className="text-rose-400 text-sm">💖</span>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-16 flex items-center justify-center z-20">
        <AnimatePresence>
          {isBlown && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
              onClick={onComplete}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 hover:scale-105 active:scale-95 transition-all"
            >
              💌 Read My Letter →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlowCandle;