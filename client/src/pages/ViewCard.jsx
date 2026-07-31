import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryFlow from "../components/StoryFlow";
import { getCard } from "../services/card.service";
import PreparingSurprise from "../components/PreparingSurprise";
const ViewCard = () => {
  const { slug } = useParams();

  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCard(slug);
        setCardData(data);
      } catch (err) {
        console.error("Error fetching card:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCard();
    } else {
      setError(true);
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return <PreparingSurprise />;
  }

  if (error || !cardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-white flex flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl mb-6">😢</div>

        <h1 className="text-3xl font-bold text-rose-600">
          Card not found
        </h1>

        <p className="mt-3 text-gray-500 max-w-sm">
          This birthday card doesn't exist, may have been removed,
          or the link is invalid.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-white flex items-center justify-center p-4">
      <StoryFlow
        receiverName={cardData.receiverName}
        senderName={cardData.senderName}
        message={cardData.message}
        music={cardData.music}
        onFinish={() => {
          console.log("Story Finished 🎉");
        }}
      />
    </div>
  );
};

export default ViewCard;