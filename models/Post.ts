import { model, Schema } from "npm:mongoose@7.0.2";

// By default, Mongoose adds an _id property to your schemas.

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

// Validations
//userSchema.path("name").required(true, "Dinosaur name cannot be blank.");

// Export model.
export default model("User", postSchema);
