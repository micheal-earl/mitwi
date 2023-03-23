import { HandlerContext } from "$fresh/server.ts";

import CommentModel from "../../../../models/Comment.ts";
import PostModel from "../../../../models/Post.ts";
import UserModel from "../../../../models/User.ts";
import validateMethod from "../../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

// ctx.params.id refers to the post id that this comment will be
// created under. This structure was necessary because I can't
// figure out how to structure dynamic routes other than using
// the bracket (i.e. [id].ts) technique.

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  const postId = ctx.params.id;
  if (!postId || typeof postId !== "string") {
    return new Response(
      JSON.stringify({ error: "Incorrect post id format" }),
      {
        status: 409,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

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

  const { body } = ctx.state.body;

  const newComment = new CommentModel({
    body,
    post: postId,
    user: token.id,
  });

  const user = await UserModel.findById(token.id);
  newComment.user = user;

  const post = await PostModel.findById(postId);
  post.comments.push(newComment._id);

  await newComment.save();
  await post.save();

  return new Response(JSON.stringify(ctx.state.body));
}
