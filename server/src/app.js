import express from "express";
import cors from "cors";

import cardRoutes from "./routes/card.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Birthday Card API is running 🚀",
  });
});

// Routes
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/uploads", uploadRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;