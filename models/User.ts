import { model, Schema } from "npm:mongoose@7.0.2";

// Define schema.
const userSchema = new Schema(
  {
    name: String,
    username: { type: String, maxLength: 25, unique: true, required: true },
    email: { type: String, maxLength: 25, unique: true, required: true },
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

userSchema.pre("remove", async function (next) {
  try {
    await this.model("Post").deleteMany({ user: this._id });
    await this.model("Comment").deleteMany({ user: this._id });
    await this.model("Notification").deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Export model.
export default model("User", userSchema);
