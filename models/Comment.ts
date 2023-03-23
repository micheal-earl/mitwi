import { model, Schema } from "npm:mongoose@7.0.2";

// Define schema.
const commentSchema = new Schema(
  {
    body: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true },
);

// Export model.
export default model("Comment", commentSchema);
