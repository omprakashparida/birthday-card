import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    receiverName: {
      type: String,
      required: true,
      trim: true,
    },

    senderName: {
      type: String,
      required: true,
      trim: true,
    },

    birthdayDate: {
      type: Date,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    appearance: {
      theme: {
        type: String,
        default: "classic",
      },

      font: {
        type: String,
        default: "Poppins",
      },

      background: {
        type: String,
        default: "",
      },
    },

    music: {
      url: {
        type: String,
        default: "",
      },

      autoplay: {
        type: Boolean,
        default: true,
      },

      loop: {
        type: Boolean,
        default: true,
      },
    },

    gallery: [
      {
        type: String,
      },
    ],

    video: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Card", cardSchema);