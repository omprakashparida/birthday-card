import asyncHandler from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";

import {
    createCard,
    getCardBySlug,
} from "../services/card.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";

export const createCardController = asyncHandler(async (req, res) => {
    const card = await createCard(req.body);

    res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            true,
            "Card created successfully",
            {
                slug: card.slug,
                shareUrl: `${env.FRONTEND_URL}/card/${card.slug}`,
            }
        )
    );
});

export const getCardController = asyncHandler(async (req, res) => {
    const card = await getCardBySlug(req.params.slug);

    if (!card) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Card not found"
        );
    }

    card.views += 1;
    await card.save();

    res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            true,
            "Card fetched successfully",
            card
        )
    );
});