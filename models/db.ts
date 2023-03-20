import mongoose from "npm:mongoose@7.0.2";
import "https://deno.land/std@0.180.0/dotenv/load.ts";

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
