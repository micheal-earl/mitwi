import { HandlerContext } from "$fresh/server.ts";
import bcrypt from "https://esm.sh/bcrypt";
import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";
import validateUser from "../../../validators/user.ts";

export function handler(req: Request, ctx: HandlerContext) {
  const validatorResp = validator(req, ctx.state.body);
  if (validatorResp) return validatorResp;

  return new Response(JSON.stringify(ctx.state.body));
}

function validator(req: Request, body: unknown): Response | null {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  const validateUserResp = validateUser(body);
  if (validateUserResp) return validateUserResp;

  return null;
}
