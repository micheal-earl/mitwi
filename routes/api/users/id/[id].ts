import { HandlerContext } from "$fresh/server.ts";

import UserModel from "../../../../models/User.ts";
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
    const user = await UserModel.findById(id).select("-hashedPassword");
    if (user) {
      const followersCount = user.followingIds.length;
      return new Response(
        JSON.stringify({ user, followersCount }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ error: "Cannot find user by provided ID" }),
      {
        status: 409,
      },
    );
  }
}
