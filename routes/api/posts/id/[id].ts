import { HandlerContext } from "$fresh/server.ts";

import PostModel from "../../../../models/Post.ts";
import validateMethod from "../../../../validators/method.ts";

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "GET");
  if (validateMethodResp) return validateMethodResp;

  const id = ctx.params.id;
  if (!id || typeof id !== "string") {
    return new Response(
      JSON.stringify({ error: "Incorrect id format" }),
      {
        status: 409,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const post = await PostModel.findById(id).populate("user");

    return new Response(
      JSON.stringify(post),
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
