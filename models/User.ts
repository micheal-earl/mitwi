import { Document, model, Schema, Types } from "npm:mongoose@7.0.2";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  hashedPassword: string;
  bio: string;
  coverImage: string;
  profileImage: string;
  followingIds: string[];
  hasNotification: boolean;
  posts: Types.ObjectId[];
  likes: Types.ObjectId[];
  notifications: Types.ObjectId[];
}

// Define schema.
const userSchema: Schema<IUser> = new Schema(
  {
    name: String,
    username: { type: String, maxLength: 25, unique: true, required: true },
    email: { type: String, maxLength: 25, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    bio: String,
    // emailVerified: Date,
    coverImage: String,
    profileImage: String,
    followingIds: [{ type: String }],
    hasNotification: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    //comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    notifications: [{
      type: Schema.Types.ObjectId,
      ref: "Notification",
    }],
  },
  { timestamps: true },
);

// userSchema.pre("remove", async function (next) {
//   try {
//     await this.model("Post").deleteMany({ user: this._id });
//     await this.model("Comment").deleteMany({ user: this._id });
//     await this.model("Notification").deleteMany({ user: this._id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Export model.
export default model<IUser>("User", userSchema);
