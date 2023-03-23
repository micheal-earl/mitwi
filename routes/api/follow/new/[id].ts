import { HandlerContext } from "$fresh/server.ts";

import UserModel from "../../../../models/User.ts";
import validateMethod from "../../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "PUT");
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

  const user = await UserModel.findById(token.id);
  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  user.followingIds.push(id);
  await user.save();

  return new Response(
    JSON.stringify({ message: "Successfully followed user!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
