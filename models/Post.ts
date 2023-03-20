import { model, Schema } from "npm:mongoose@7.0.2";

// Define schema.
const postSchema = new Schema(
  {
    body: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likedIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

postSchema.pre("remove", async function (next) {
  try {
    await this.model("Comment").deleteMany({ post: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Export model.
export default model("User", postSchema);
