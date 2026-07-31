import { useState } from "react";

// ==========================================
// PAGE 1 — Birthday Intro Screen
// Pink background, script heading with the recipient's name,
// cute bear + cake illustration, teasing Yes/No buttons.
// ==========================================

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Quicksand:wght@500;600;700&display=swap');
    .font-script { font-family: 'Caveat', cursive; }
    .font-round { font-family: 'Quicksand', ui-sans-serif, system-ui, sans-serif; }
  `}</style>
);

// Simple flat-cartoon bear + cake illustration (built from scratch, no external assets)
const BirthdayIllustration = () => (
  <svg viewBox="0 0 320 200" width="220" height="138" xmlns="http://www.w3.org/2000/svg">
    {/* bunting banner */}
    <path d="M20 18 Q160 -6 300 18" stroke="#f2a7c3" strokeWidth="2" fill="none" />
    {[35, 75, 115, 155, 195, 235, 275].map((x, i) => (
      <polygon
        key={x}
        points={`${x},18 ${x + 14},18 ${x + 7},34`}
        fill={["#f6a5c0", "#a7d8f0", "#ffd88a", "#b7e3b0", "#f2a7c3", "#a7d8f0", "#ffd88a"][i]}
      />
    ))}

    {/* confetti */}
    <text x="14" y="60" fontSize="14">⭐</text>
    <text x="290" y="50" fontSize="16">⭐</text>
    <text x="30" y="130" fontSize="14">🌸</text>
    <text x="278" y="130" fontSize="14">🌸</text>
    <text x="250" y="70" fontSize="16">💗</text>

    {/* left bear (brown) */}
    <g>
      <ellipse cx="118" cy="120" rx="34" ry="32" fill="#c99a6b" />
      <circle cx="94" cy="92" r="10" fill="#c99a6b" />
      <circle cx="142" cy="92" r="10" fill="#c99a6b" />
      <circle cx="94" cy="92" r="5" fill="#e7bd93" />
      <circle cx="142" cy="92" r="5" fill="#e7bd93" />
      {/* party hat */}
      <polygon points="105,95 131,95 118,62" fill="#f6a5c0" />
      <circle cx="118" cy="63" r="4" fill="#ffd88a" />
      {/* face */}
      <circle cx="107" cy="118" r="3" fill="#4a3323" />
      <circle cx="129" cy="118" r="3" fill="#4a3323" />
      <ellipse cx="118" cy="128" rx="6" ry="4" fill="#8a5a34" />
      <circle cx="100" cy="126" r="5" fill="#f2b6a0" opacity="0.6" />
      <circle cx="136" cy="126" r="5" fill="#f2b6a0" opacity="0.6" />
    </g>

    {/* right bear (white) */}
    <g>
      <ellipse cx="196" cy="120" rx="34" ry="32" fill="#fbf6ef" stroke="#eee0cf" strokeWidth="1" />
      <circle cx="172" cy="92" r="10" fill="#fbf6ef" stroke="#eee0cf" strokeWidth="1" />
      <circle cx="220" cy="92" r="10" fill="#fbf6ef" stroke="#eee0cf" strokeWidth="1" />
      {/* party hat */}
      <polygon points="183,95 209,95 196,62" fill="#a7d8f0" />
      <circle cx="196" cy="63" r="4" fill="#ffd88a" />
      {/* face */}
      <circle cx="185" cy="118" r="3" fill="#4a3323" />
      <circle cx="207" cy="118" r="3" fill="#4a3323" />
      <ellipse cx="196" cy="128" rx="6" ry="4" fill="#e7c9ae" />
      <circle cx="178" cy="126" r="5" fill="#f2b6a0" opacity="0.6" />
      <circle cx="214" cy="126" r="5" fill="#f2b6a0" opacity="0.6" />
    </g>

    {/* cake */}
    <g>
      <rect x="130" y="150" width="60" height="26" rx="4" fill="#f6a5c0" />
      <rect x="130" y="150" width="60" height="8" rx="4" fill="#fbcada" />
      <rect x="157" y="132" width="6" height="20" fill="#ffd88a" />
      <ellipse cx="160" cy="130" rx="4" ry="6" fill="#ffb648" />
      <text x="134" y="168" fontSize="8" fontWeight="700" fill="#c1447a" fontFamily="Quicksand, sans-serif">
        HAPPY
      </text>
    </g>
  </svg>
);

const BirthdayIntroScreen = ({ receiverName, onNext }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("No");

  const teasingPhrases = ["No", "Nope!", "Try again", "Nuh-uh", "Missed!"];

  const handleNoHover = () => {
    const randomX = Math.floor(Math.random() * 110) - 30;
    const randomY = Math.floor(Math.random() * 40) - 20;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoText(teasingPhrases[Math.floor(Math.random() * teasingPhrases.length)]);
  };

  return (
    <div
      className="font-round"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 560,
        background: "linear-gradient(180deg, #fbdce6 0%, #f9cddb 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FontLoader />

      {/* soft background blobs */}
      <div style={{ position: "absolute", top: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
      <div style={{ position: "absolute", bottom: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />

      {/* heading */}
      <h1
        className="font-script"
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: "#d6265f",
          textAlign: "center",
          margin: "0 0 4px",
          lineHeight: 1.15,
          position: "relative",
          zIndex: 2,
        }}
      >
        Happy Birthday,
        <br />
        {receiverName || "Friend"} <span style={{ color: "#f0507f" }}>♥</span>
      </h1>

      {/* illustration */}
      <div style={{ margin: "10px 0 8px", position: "relative", zIndex: 2 }}>
        <BirthdayIllustration />
      </div>

      {/* subtitle */}
      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#a83c5e",
          textAlign: "center",
          margin: "6px 0 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Are you excited for what's next?
      </p>

      {/* Yes / No buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", height: 60, zIndex: 3 }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 34px",
            background: "#f0507f",
            color: "white",
            fontWeight: 700,
            fontSize: 15,
            border: "none",
            borderRadius: 14,
            boxShadow: "0 10px 20px rgba(240,80,127,0.35)",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Yes
        </button>

        <button
          onMouseEnter={handleNoHover}
          onClick={handleNoHover}
          style={{
            padding: "12px 30px",
            background: "#fff5f8",
            color: "#c05575",
            fontWeight: 600,
            fontSize: 15,
            border: "1.5px solid #f6c4d4",
            borderRadius: 14,
            position: "absolute",
            left: "68%",
            whiteSpace: "nowrap",
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            transition: "transform 0.2s ease-out",
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          {noText}
        </button>
      </div>
    </div>
  );
};

export default BirthdayIntroScreen;