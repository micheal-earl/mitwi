import { HandlerContext } from "$fresh/server.ts";

import PostModel from "../../../models/Post.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "POST");
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

  const { body } = ctx.state.body;

  const newPost = new PostModel({
    body,
    user: token.id,
  });
  await newPost.save();

  return new Response(JSON.stringify(ctx.state.body));
}
