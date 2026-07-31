import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/card.service";
import { uploadImage, uploadMusic } from "../services/upload.service";
import StoryFlow from "../components/StoryFlow";
import { IoClose } from "react-icons/io5";

const palette = {
  cream: "#FFF8F2",
  blush: "#FDE8E0",
  rose: "#E1476B",
  roseDark: "#B8324F",
  gold: "#C0873C",
  goldLight: "#F3D9AE",
  plum: "#3D2233",
  plumSoft: "#7A5866",
};

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Outfit:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Playfair Display', Georgia, serif; }
    .font-body { font-family: 'Outfit', ui-sans-serif, system-ui, sans-serif; }
  `}</style>
);

const CreateCard = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("form");
  const [musicFileName, setMusicFileName] = useState("");
  const [uploadingMusic, setUploadingMusic] = useState(false);
  const [createdCard, setCreatedCard] = useState(null); // Stores { slug, shareUrl } upon success

  const [formData, setFormData] = useState({
    receiverName: "",
    senderName: "",
    message: "",
    music: "",
  });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleMusicUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploadingMusic(true);
      setMusicFileName(file.name);

      const musicUrl = await uploadMusic(file);

      setFormData((prev) => ({
        ...prev,
        music: {
          url: musicUrl,
          autoplay: true,
          loop: true,
        },
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to upload music.");
      setMusicFileName("");
    } finally {
      setUploadingMusic(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    try {
      const payload = {
        ...formData,
      };
  
      // Don't send music if the user didn't upload one
      if (!payload.music) {
        delete payload.music;
      }
  
      const card = await createCard(payload);
  
      const finalShareUrl =
        card.shareUrl || `${window.location.origin}/card/${card.slug}`;
  
      setCreatedCard({
        slug: card.slug,
        shareUrl: finalShareUrl,
      });
    } catch (error) {
      console.log(JSON.stringify(error.response?.data, null, 2));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (!createdCard) return;
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: `🎉 Birthday Surprise for ${formData.receiverName}`,
          text: `Open to see your surprise 🎁`,
          url: createdCard.shareUrl,
        });
  
        // Close popup after successful share
        setCreatedCard(null);
  
      } catch (error) {
        console.log(error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(createdCard.shareUrl);
      alert("Share link copied to clipboard.");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    background: "#FBF4EE",
    border: `1px solid ${palette.blush}`,
    borderRadius: 14,
    outline: "none",
    fontWeight: 500,
    color: palette.plum,
    fontSize: 14,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: palette.gold,
    marginBottom: 8,
  };

  return (
    <div
      className="font-body"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: `radial-gradient(circle at 20% 0%, ${palette.blush} 0%, ${palette.cream} 55%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        position: "relative"
      }}
    >
      <FontLoader />

      <div style={{ width: "100%", maxWidth: 520, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${palette.rose}, ${palette.gold})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            ♥
          </div>
          <h1 className="font-display" style={{ fontSize: 19, fontWeight: 600, color: palette.plum, margin: 0 }}>
            WishCraft
          </h1>
        </div>

        <div style={{ display: "flex", background: "white", padding: 4, borderRadius: 12, border: `1px solid ${palette.blush}` }}>
          <button
            onClick={() => setViewMode("form")}
            style={{
              padding: "8px 16px",
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: viewMode === "form" ? palette.rose : "transparent",
              color: viewMode === "form" ? "white" : palette.plumSoft,
              transition: "all 0.2s ease",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setViewMode("preview")}
            style={{
              padding: "8px 16px",
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: viewMode === "preview" ? palette.rose : "transparent",
              color: viewMode === "preview" ? "white" : palette.plumSoft,
              transition: "all 0.2s ease",
            }}
          >
            Preview
          </button>
        </div>
      </div>

      {viewMode === "form" ? (
        <div
          style={{
            width: "100%",
            maxWidth: 520,
            background: "white",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(61,34,51,0.14)",
            display: "flex",
            flexDirection: "column",
            minHeight: 600,
            padding: "32px 28px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 className="font-display" style={{ fontSize: 25, fontWeight: 600, color: palette.plum, margin: "0 0 6px" }}>
              Build your surprise
            </h2>
            <p style={{ fontSize: 13, color: palette.plumSoft, margin: "0 0 26px" }}>
              Fill in the details, then preview it before sending.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>Recipient name</label>
                <input type="text" name="receiverName" placeholder="e.g. Rahul" value={formData.receiverName} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>The secret message</label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Write your heartfelt birthday wishes here..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Sign off</label>
                <input type="text" name="senderName" placeholder="e.g. With love, your bestie" value={formData.senderName} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Background Music</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleMusicUpload}
                  disabled={uploadingMusic}
                  style={{
                    ...inputStyle,
                    cursor: uploadingMusic ? "not-allowed" : "pointer",
                    padding: "10px 16px",
                  }}
                />
                
                {uploadingMusic && (
                  <div style={{ marginTop: 8, fontSize: 13, color: palette.plum }}>
                    Uploading music...
                  </div>
                )}
                
                {!uploadingMusic && formData.music && (
                  <div style={{ marginTop: 8, fontSize: 13, color: palette.plum, fontWeight: 500 }}>
                    ✅ Music uploaded successfully
                    <br />
                    <span style={{ fontSize: 12, color: palette.plumSoft, fontWeight: 400 }}>
                      {musicFileName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 24, marginTop: 24, borderTop: `1px solid ${palette.blush}`, display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={() => setViewMode("preview")}
              style={{
                width: "100%",
                padding: "14px",
                background: palette.blush,
                color: palette.roseDark,
                fontWeight: 700,
                borderRadius: 14,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
              }}
            >
              Test interactive preview
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "15px",
                background: `linear-gradient(135deg, ${palette.rose}, ${palette.roseDark})`,
                color: "white",
                fontWeight: 700,
                borderRadius: 14,
                fontSize: 14,
                border: "none",
                cursor: isSubmitting ? "default" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
                boxShadow: "0 12px 24px rgba(225,71,107,0.3)",
              }}
            >
              {isSubmitting ? "Publishing..." : "Generate shareable link"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 520, position: "relative" }}>
          <button
            onClick={() => setViewMode("form")}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 50,
              background: "rgba(255,255,255,0.9)",
              padding: "7px 14px",
              borderRadius: 999,
              boxShadow: "0 2px 8px rgba(61,34,51,0.1)",
              fontSize: 12,
              fontWeight: 700,
              color: palette.plum,
              border: `1px solid ${palette.blush}`,
              cursor: "pointer",
            }}
          >
            ← Back to edit
          </button>

          <StoryFlow
            receiverName={formData.receiverName}
            senderName={formData.senderName}
            message={formData.message}
            music={formData.music}
            onFinish={() => setViewMode("form")}
          />
        </div>
      )}

      {/* SUCCESS OVERLAY MODAL */}
      {createdCard && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(61, 34, 51, 0.4)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "white",
              borderRadius: 28,
              padding: "36px 28px",
              width: "100%",
              maxWidth: 420,
              textAlign: "center",
              boxShadow: "0 32px 64px rgba(61, 34, 51, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <button
              onClick={() => setCreatedCard(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "transparent",
                color: "#888",
                fontSize: 24,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f5";
                e.currentTarget.style.color = "#E1476B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#888";
              }}
            >
              <IoClose size={24} />
            </button>

            <div style={{ fontSize: 48, marginBottom: 12, animation: "bounce 2s infinite" }}>🎉</div>
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: palette.plum, margin: "0 0 10px" }}>
              Card Created Successfully!
            </h2>
            <p style={{ fontSize: 14, color: palette.plumSoft, margin: "0 0 24px", lineHeight: 1.5 }}>
              Your beautiful surprise is ready. Share this link with {formData.receiverName || "your friend"}.
            </p>

            <div
              style={{
                width: "100%",
                background: palette.blush,
                borderRadius: 14,
                padding: "14px 16px",
                fontSize: 13,
                color: palette.roseDark,
                fontWeight: 600,
                wordBreak: "break-all",
                marginBottom: 28,
                border: `1px solid rgba(225, 71, 107, 0.2)`
              }}
            >
              {createdCard.shareUrl}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
              <button
                onClick={handleShare}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: `linear-gradient(135deg, ${palette.rose}, ${palette.roseDark})`,
                  color: "white",
                  fontWeight: 700,
                  borderRadius: 14,
                  fontSize: 15,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 12px 24px rgba(225,71,107,0.3)",
                }}
              >
                📤 Share Link
              </button>

              <button
                onClick={handleCopyLink}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: palette.cream,
                  color: palette.plum,
                  fontWeight: 700,
                  borderRadius: 14,
                  fontSize: 15,
                  border: `1px solid ${palette.goldLight}`,
                  cursor: "pointer",
                }}
              >
                📋 Copy Link
              </button>

              <button
                onClick={() => navigate(`/card/${createdCard.slug}`)}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "transparent",
                  color: palette.plumSoft,
                  fontWeight: 600,
                  borderRadius: 14,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 4
                }}
              >
                👀 View Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCard;