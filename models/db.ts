//import mongoose from "https://esm.sh/mongoose@7.0.2";
import mongoose from "npm:mongoose@7.0.2";
import "https://deno.land/std@0.180.0/dotenv/load.ts";

// import UserModel from "./User.ts";
// import PostModel from "./Post.ts";
// import CommentModel from "./Comment.ts";
// import NotificationModel from "./Notification.ts";

const DATABASE_URI = String(Deno.env.get("DATABASE_URI"));

await mongoose.connect(DATABASE_URI);

async function connectToDatabase() {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

export default connectToDatabase;
