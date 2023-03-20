import { model, Schema } from "npm:mongoose@7.0.2";

// By default, Mongoose adds an _id property to your schemas.

// Define schema.
const userSchema = new Schema(
  {
    name: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    bio: String,
    emailVerified: Date,
    coverImage: String,
    profileImage: String,
    followingIds: [{ type: String }],
    hasNotification: Boolean,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    notifications: [{
      type: Schema.Types.ObjectId,
      ref: "Notification",
    }],
  },
  { timestamps: true },
);

// Validations
//userSchema.path("name").required(true, "Dinosaur name cannot be blank.");

// Export model.
export default model("User", userSchema);
