import Card from "../models/Card.js";
import generateSlug from "../utils/generateSlug.js";

export const createCard = async (cardData) => {
  let slug = generateSlug();

  // Ensure the slug is unique
  while (await Card.findOne({ slug })) {
    slug = generateSlug();
  }

  const card = await Card.create({
    ...cardData,
    slug,
  });

  return card;
};

export const getCardBySlug = async (slug) => {
  return await Card.findOne({ slug });
};