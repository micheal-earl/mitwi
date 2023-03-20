import { model, Schema } from "npm:mongoose@7.0.2";

// By default, Mongoose adds an _id property to your schemas.

// Define schema.
const commentSchema = new Schema(
  {
    body: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true },
);

// Validations
//userSchema.path("name").required(true, "Dinosaur name cannot be blank.");

// Export model.
export default model("User", commentSchema);
