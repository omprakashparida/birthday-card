import { useState } from "react";

const ThemePicker = ({ receiverName = "Om" }) => {
    // 1. State for the selected theme
    const [activeTheme, setActiveTheme] = useState("cute");

    // 2. State for the runaway "No" button position
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

    // Function to make the "No" button jump away
    const handleNoHover = () => {
        // Generate random constraints so it stays inside the phone screen
        const randomX = Math.floor(Math.random() * 120) - 60; // -60px to 60px
        const randomY = Math.floor(Math.random() * 150) - 75; // -75px to 75px
        setNoButtonPosition({ x: randomX, y: randomY });
    };

    // Handle "Yes" click (This would eventually move them to the balloons or next screen)
    const handleYesClick = () => {
        alert("Yay! Let's go to the next surprise!");
    };

    // Theme Configurations
    const themes = {
        cute: {
            bg: "bg-pink-100",
            text: "text-rose-700",
            title: "text-rose-600",
            btnYes: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-300",
            btnNo: "bg-white text-rose-500 shadow-sm",
        },
        classic: {
            bg: "bg-slate-900",
            text: "text-amber-100",
            title: "text-amber-400",
            btnYes: "bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-amber-900/50",
            btnNo: "bg-slate-800 text-amber-500 border border-slate-700",
        }
    };

    const currentStyle = themes[activeTheme];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0e17] text-white font-sans py-8">
            
            <h2 className="text-xl text-slate-300 font-medium mb-8">
                Pick a style — this is how it will look
            </h2>

            {/* THE PHONE MOCKUP */}
            <div className={`relative w-[320px] h-[650px] rounded-[3rem] border-[8px] border-slate-800 overflow-hidden shadow-2xl transition-colors duration-500 ${currentStyle.bg}`}>
                
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>

                {/* Floating Background Elements (Subtle Hearts/Stars) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    <span className="absolute top-[20%] left-[15%] text-pink-300 animate-pulse text-sm">❤️</span>
                    <span className="absolute top-[40%] right-[20%] text-pink-300 animate-pulse text-lg">❤️</span>
                    <span className="absolute bottom-[30%] left-[30%] text-pink-300 animate-pulse text-xs">❤️</span>
                </div>

                {/* CARD CONTENT */}
                <div className="flex flex-col items-center justify-center h-full px-6 pt-12 relative z-10">
                    
                    <h1 className={`text-3xl font-serif italic font-bold text-center mb-8 ${currentStyle.title}`}>
                        Happy Birthday,<br/>{receiverName}
                    </h1>

                    {/* Cute Illustration Placeholder */}
                    <div className="w-48 h-48 mb-8 flex items-center justify-center">
                        {/* Replace this img src with your actual bears/cake GIF */}
                        <img 
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Ftc215ZWJ3OWp3ZHV2Z3h3ZHV2Z3h3ZHV2Z3h3ZHV2Z3h3ZHV2ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/i3ks1IM3s0I2Q/giphy.gif" 
                            alt="Cute Birthday Bears" 
                            className="w-full h-full object-contain drop-shadow-md"
                        />
                    </div>

                    <p className={`text-sm font-semibold text-center mb-6 ${currentStyle.text}`}>
                        Are you excited to see what's next?
                    </p>

                    {/* Interactive Buttons */}
                    <div className="flex items-center gap-4 relative h-16 w-full justify-center">
                        <button 
                            onClick={handleYesClick}
                            className={`px-8 py-3 rounded-2xl font-bold shadow-lg transition-transform active:scale-95 ${currentStyle.btnYes}`}
                        >
                            Yes
                        </button>
                        
                        {/* The Runaway 'No' Button */}
                        <button 
                            onMouseEnter={handleNoHover}
                            onClick={handleNoHover} // For mobile taps
                            style={{ 
                                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                            }}
                            className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ease-out absolute ${currentStyle.btnNo}`}
                        >
                            No
                        </button>
                    </div>

                </div>
            </div>

            {/* THEME SELECTORS (Bottom) */}
            <div className="flex gap-4 mt-10">
                
                {/* Cute Theme Button */}
                <button 
                    onClick={() => setActiveTheme("cute")}
                    className={`flex flex-col items-center p-4 rounded-3xl border-2 transition-all w-40 ${
                        activeTheme === "cute" 
                        ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                        : "border-slate-800 bg-slate-900/50 hover:bg-slate-800"
                    }`}
                >
                    <div className="w-full h-10 bg-gradient-to-r from-pink-200 to-pink-300 rounded-xl mb-3 flex items-center justify-center gap-1">
                        <span className="text-pink-500 text-xs">♥️ ♥️ ♥️</span>
                    </div>
                    <span className="text-pink-400 font-bold text-sm">Cute & Sweet</span>
                    <span className="text-slate-500 text-[10px]">Playful & Pink</span>
                </button>

                {/* Classic Theme Button */}
                <button 
                    onClick={() => setActiveTheme("classic")}
                    className={`flex flex-col items-center p-4 rounded-3xl border-2 transition-all w-40 ${
                        activeTheme === "classic" 
                        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]" 
                        : "border-slate-800 bg-slate-900/50 hover:bg-slate-800"
                    }`}
                >
                    <div className="w-full h-10 bg-slate-950 rounded-xl mb-3 flex items-center justify-center gap-1">
                        <span className="text-purple-400 text-xs">✨ 💜 ✨</span>
                    </div>
                    <span className="text-purple-100 font-bold text-sm">Classic</span>
                    <span className="text-slate-500 text-[10px]">Magical & Cinematic</span>
                </button>

            </div>
        </div>
    );
};

export default ThemePicker;