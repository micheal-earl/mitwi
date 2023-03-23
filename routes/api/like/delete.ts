import { HandlerContext } from "$fresh/server.ts";

import PostModel from "../../../models/Post.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "DELETE");
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

  if (index !== -1) {
    post.likedIds.splice(index, 1);
    await post.save();
    return new Response(
      JSON.stringify({ message: "Successfully unliked post!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } else {
    return new Response(
      JSON.stringify({ error: "User is not a follower" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
