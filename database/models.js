import mongoose from "mongoose";

const RootSchema = new mongoose.Schema({
  expires_at: {
    type: Number,
    required: true,
  },
});

export const RootModel = mongoose.model("Root", RootSchema);
