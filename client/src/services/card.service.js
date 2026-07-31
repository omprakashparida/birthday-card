import api from "./api";

export const createCard = async (cardData) => {
  const response = await api.post("/cards", cardData);

  return response.data.data;
};

export const getCard = async (slug) => {
  const response = await api.get(`/cards/${slug}`);
  return response.data.data;
};

// Add this to your src/services/card.service.js file

export const getCardBySlug = async (slug) => {
    try {
        // TODO: Replace this with your actual database fetch logic!
        // Example: const response = await axios.get(`/api/cards/${slug}`);
        // return response.data;

        // ---------------------------------------------------------
        // MOCK DATA: This simulates a database response so your UI works right now
        // ---------------------------------------------------------
        console.log(`Fetching card with slug: ${slug}...`);
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        return {
            receiverName: "Om",
            senderName: "Your Best Friend",
            message: "I hope you have the most amazing birthday ever! You deserve it.",
            theme: "cute",
            slug: slug
        };

    } catch (error) {
        console.error("Error in getCardBySlug:", error);
        throw error;
    }
};