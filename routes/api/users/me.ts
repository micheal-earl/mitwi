import { HandlerContext } from "$fresh/server.ts";

import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "GET");
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

  const user = await UserModel.findById(token.id).select("-hashedPassword");

  return new Response(
    JSON.stringify(user),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
