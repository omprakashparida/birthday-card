import express from "express";

import {
  createCardController,
  getCardController,
} from "../controllers/card.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createCardSchema,
} from "../validations/card.validation.js";

const router = express.Router();

router.post(
  "/",
  validate(createCardSchema),
  createCardController
);

router.get("/:slug", getCardController);

export default router;