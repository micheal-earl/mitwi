import { HandlerContext } from "$fresh/server.ts";

import CommentModel from "../../../../models/Comment.ts";
import PostModel from "../../../../models/Post.ts";
import validateMethod from "../../../../validators/method.ts";

// ctx.params.id refers to the post id that this comment will be
// created under. This structure was necessary because I can't
// figure out how to structure dynamic routes other than using
// the bracket (i.e. [id].ts) technique.

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "GET");
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

  const comments = CommentModel.find({ post: postId }).select("-user").lean()
    .exec();

  // const postWithUser = PostModel.findById(postId).populate("user");

  // const user = postWithUser.user;

  // return new Response(JSON.stringify({ comments, user }));
  return new Response(JSON.stringify(comments));
}
