import { HandlerContext } from "$fresh/server.ts";

import PostModel from "../../../models/Post.ts";
import validateMethod from "../../../validators/method.ts";

export async function handler(req: Request, _ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "GET");
  if (validateMethodResp) return validateMethodResp;

  const posts = await PostModel.find().populate("user");

  return new Response(
    JSON.stringify(posts.reverse()),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
