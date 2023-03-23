import { HandlerContext } from "$fresh/server.ts";

import CommentModel from "../../../../models/Comment.ts";
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

  try {
    const posts = await CommentModel.find({ post: postId });

    return new Response(
      JSON.stringify(posts),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Cannot find post by provided ID" }),
      {
        status: 409,
      },
    );
  }
}
