import { HandlerContext } from "$fresh/server.ts";
import UserModel from "../../models/User.ts";

export async function handler(_req: Request, _ctx: HandlerContext) {
  try {
    const users = await UserModel.find();
    return Response.json(JSON.stringify(users));
  } catch (error) {
    return new Response(error);
  }
}
