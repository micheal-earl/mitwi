import { model, Schema } from "npm:mongoose@7.0.2";

// Define schema.
const notificationSchema = new Schema(
  {
    body: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

// Export model.
export default model("User", notificationSchema);
