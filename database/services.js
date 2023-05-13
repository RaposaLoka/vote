import { RootModel } from "./models.js";

export const updateExpires_at = (expires_at) =>
  RootModel.findOneAndUpdate(
    { _id: "645a0d2637088eaea2354f62" },
    { expires_at }
  );

export const findExpires_at = () =>
  RootModel.findById("645a0d2637088eaea2354f62");
