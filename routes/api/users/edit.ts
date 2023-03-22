import { HandlerContext } from "$fresh/server.ts";

import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

interface UserForEdit {
  name: string;
  username: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "PUT");
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

  const { name, username, bio, profileImage, coverImage } = ctx.state
    .body as UserForEdit;

  if (!name || !username) {
    return new Response(
      JSON.stringify({ error: "Invalid fields" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    token.id,
    { name, username, bio, profileImage, coverImage },
    { new: true },
  ).select("-hashedPassword");

  return new Response(
    JSON.stringify(updatedUser),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
