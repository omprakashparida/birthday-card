import { useState, useEffect, useCallback, memo, useRef, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const balloonsData = [
  { id: "you", word: "You", number: "1", gradient: "from-sky-300/90 to-blue-400/90", color: "#7dd3fc" },
  { id: "are", word: "are", number: "2", gradient: "from-rose-300/90 to-pink-400/90", color: "#fda4af" },
  { id: "so", word: "so", number: "3", gradient: "from-emerald-300/90 to-teal-400/90", color: "#6ee7b7" },
  { id: "special", word: "special", number: "4", gradient: "from-violet-300/90 to-purple-400/90", color: "#c4b5fd" },
];

const confettiColors = ["#f9a8d4", "#a7f3d0", "#c4b5fd", "#fde68a", "#fca5a5"];

const ConfettiBurst = memo(({ x, y }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      distance: 40 + Math.random() * 50,
      isHeart: i % 4 === 0,
      rotate: Math.random() * 360,
      color: confettiColors[i % confettiColors.length],
    }));
  }, []);

  return (
    <div className="absolute pointer-events-none z-40" style={{ top: y, left: x }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance + 20,
            opacity: 0,
            scale: p.isHeart ? 1.5 : 0.6,
            rotate: p.rotate,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {p.isHeart ? (
            <span className="text-rose-400 text-xs sm:text-sm">❤️</span>
          ) : (
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          )}
        </motion.div>
      ))}
    </div>
  );
});

const Sparkles = memo(() => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 16 }).map(() => ({
      top: `${30 + Math.random() * 40}%`,
      left: `${15 + Math.random() * 70}%`,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random(),
      repeatDelay: Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-amber-300 drop-shadow-md"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{
            delay: s.delay,
            duration: s.duration,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
});

const Balloon = memo(({ balloon, onPop, index, playPop }) => {
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = (e) => {
    if (isPopping) return;
    setIsPopping(true);
    playPop();

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const parent = target.closest("[data-balloon-field]");
    const parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
    const cx = rect.left - parentRect.left + rect.width / 2;
    const cy = rect.top - parentRect.top + rect.height / 2;

    setTimeout(() => {
      onPop(balloon, cx, cy);
    }, 120);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer select-none z-10"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        isPopping
          ? { scale: 1.15, opacity: 0.9 }
          : { opacity: 1, scale: 1, y: [0, -15, 0], x: [0, 6, -4, 0], rotate: [0, 3, -2, 0] }
      }
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
        y: { duration: 3.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 4.2 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5 + index * 0.3, repeat: Infinity, ease: "easeInOut" },
      }}
      onClick={handleClick}
    >
      <div
        className={`relative w-24 h-28 sm:w-28 sm:h-32 shadow-xl flex items-center justify-center bg-gradient-to-br ${balloon.gradient}`}
        style={{ borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%" }}
      >
        <div className="absolute top-2 left-4 w-6 h-10 rounded-[50%] bg-white/40 blur-[2px] rotate-[-20deg]" />
        
        {!isPopping && (
          <span className="text-white/90 font-bold text-3xl sm:text-4xl drop-shadow-md z-20 pointer-events-none">
            {balloon.number}
          </span>
        )}
      </div>
      <div
        className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent mt-[-2px]"
        style={{ borderBottomColor: balloon.color }}
      />
      <div className="w-[1px] h-12 bg-gray-400/50" />
    </motion.div>
  );
});

const BalloonGame = ({ onComplete }) => {
  const [poppedIds, setPoppedIds] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [revealedWords, setRevealedWords] = useState([]);
  const [title, setTitle] = useState(`Pop all ${balloonsData.length} balloons`);
  const [showHeart, setShowHeart] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const popAudio = useRef(null);

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      popAudio.current = new Audio("data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
      popAudio.current.volume = 0.3;
    }
  }, []);

  const playPop = useCallback(() => {
    if (popAudio.current) {
      popAudio.current.currentTime = 0;
      popAudio.current.play().catch(() => {});
    }
  }, []);

  const handlePop = useCallback((balloon, cx, cy) => {
    const burstId = `${balloon.id}-${Date.now()}`;
    setBursts((prev) => [...prev, { id: burstId, x: cx, y: cy }]);
    setPoppedIds((prev) => [...prev, balloon.id]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 700);
  }, []);

  useEffect(() => {
    const remaining = balloonsData.length - poppedIds.length;
    
    if (remaining === 1) {
      setTitle("🎈 One more!");
    } else if (remaining === 0 && poppedIds.length > 0) {
      setTitle("✨ Amazing! ✨");
      
      const runSequence = async () => {
        await new Promise((r) => setTimeout(r, 800));
        setTitle("Look what they spell...");
        await new Promise((r) => setTimeout(r, 600));

        for (let i = 0; i < balloonsData.length; i++) {
          setRevealedWords((prev) => [...prev, balloonsData[i].id]);
          await new Promise((r) => setTimeout(r, 400));
        }

        await new Promise((r) => setTimeout(r, 200));
        setShowHeart(true);

        await new Promise((r) => setTimeout(r, 2500));
        setShowContinue(true);
      };
      
      runSequence();
    }
  }, [poppedIds]);

  return (
    <LayoutGroup>
      <div className="relative w-full min-h-[500px] sm:min-h-[600px] bg-gradient-to-b from-pink-50 to-rose-100 rounded-3xl overflow-hidden flex flex-col items-center px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.h2
            key={title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="text-xl sm:text-2xl font-bold text-rose-500 text-center z-30 h-8"
          >
            {title}
          </motion.h2>
        </AnimatePresence>

        <div className="relative grid grid-cols-2 grid-rows-2 w-full flex-1 p-2 sm:p-4 gap-4 mt-4" data-balloon-field>
          {balloonsData.map((balloon, index) => (
            <div key={balloon.id} className="relative flex items-center justify-center">
              <AnimatePresence>
                {!poppedIds.includes(balloon.id) && (
                  <Balloon
                    balloon={balloon}
                    index={index}
                    onPop={handlePop}
                    playPop={playPop}
                  />
                )}
              </AnimatePresence>

              {poppedIds.includes(balloon.id) && !revealedWords.includes(balloon.id) && (
                <motion.span
                  layoutId={`word-${balloon.id}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute text-2xl sm:text-3xl font-serif italic text-rose-500 drop-shadow-sm pointer-events-none"
                >
                  {balloon.word}
                </motion.span>
              )}
            </div>
          ))}

          {bursts.map((burst) => (
            <ConfettiBurst key={burst.id} x={burst.x} y={burst.y} />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-6"
            animate={showContinue ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {revealedWords.map((id) => {
              const b = balloonsData.find((x) => x.id === id);
              return (
                <motion.span
                  key={b.id}
                  layoutId={`word-${b.id}`}
                  transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.8 }}
                  className="text-3xl sm:text-4xl font-serif italic text-rose-600 drop-shadow-sm"
                >
                  {b.word}
                </motion.span>
              );
            })}
            
            <AnimatePresence>
              {showHeart && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-3xl sm:text-4xl ml-2 drop-shadow-sm"
                >
                  ❤️
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {showHeart && <Sparkles />}

        <AnimatePresence>
          {showContinue && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 z-50 px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 pointer-events-auto transition-colors"
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default BalloonGame;