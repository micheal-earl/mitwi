import { HandlerContext } from "$fresh/server.ts";

import PostModel from "../../../models/Post.ts";
import NotificationModel from "../../../models/Notification.ts";
import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "PUT");
  if (validateMethodResp) return validateMethodResp;

  const token = ctx.state.token as Token;
  if (!token) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { postId } = ctx.state.body;

  if (!postId || typeof postId !== "string") {
    return new Response(
      JSON.stringify({ error: "Invalid ID" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const post = await PostModel.findById(postId);
  if (!post) {
    return new Response(
      JSON.stringify({ error: "Post not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const index = post.likedIds.indexOf(token.id);
  if (index === -1) {
    post.likedIds.push(token.id);
    await post.save();
  }

  // NOTIFICATION PART START
  try {
    const post = await PostModel.findById(postId);

    if (post?.user) {
      console.log("post has user");
      const notif = new NotificationModel({
        body: "Someone liked your tweet!",
        user: post.user,
      });

      await notif.save();

      const user = await UserModel.findById(post.user);
      if (user) {
        console.log("We found user");
        user.hasNotification = true;
        await user.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
  // NOTIFICATION PART END

  return new Response(
    JSON.stringify({ message: "Successfully liked post!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
