import React, { useMemo } from "react";
import { motion } from "framer-motion";

const PreparingSurprise = () => {
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 14 + Math.random() * 18,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      size: 10 + Math.random() * 12,
      delay: Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[500px] overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center font-sans">
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-rose-300/70 select-none"
            style={{ left: heart.left, bottom: "-10%", fontSize: heart.size }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, (heart.id % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.div>
        ))}

        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute text-amber-300/80 select-none"
            style={{ top: sparkle.top, left: sparkle.left, fontSize: sparkle.size }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
            transition={{
              duration: 2,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90%] max-w-[400px] bg-white/60 backdrop-blur-md rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(225,71,107,0.12)] border border-white/80 flex flex-col items-center text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-6xl sm:text-7xl mb-6 drop-shadow-sm select-none"
        >
          🎁
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-600 mb-3 tracking-wide drop-shadow-sm">
          Preparing Something Special...
        </h2>

        <p className="text-sm sm:text-base text-rose-400 font-medium mb-8 leading-relaxed">
          Unwrapping magic and weaving memories just for you ✨
        </p>

        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-6 h-6 border-3 border-rose-400 border-t-transparent rounded-full shadow-sm"
          />
          <span className="text-xs font-bold tracking-widest text-rose-400 uppercase">
            Loading Surprise
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default PreparingSurprise;