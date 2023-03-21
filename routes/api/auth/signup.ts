import { HandlerContext } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";
import validateUser from "../../../validators/user-signup.ts";
import key from "../../../utils/jwtkey.ts";

export async function handler(req: Request, ctx: HandlerContext) {
  const validatorResp = validator(req, ctx.state.body);
  if (validatorResp) return validatorResp;

  const { username, email, password } = ctx.state.body;

  const existingUser = await UserModel.findOne({ username });
  const existingEmail = await UserModel.findOne({ email });
  if (existingUser || existingEmail) {
    return new Response(
      JSON.stringify({ error: "Username or email already in use" }),
      {
        status: 409,
      },
    );
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    email,
    hashedPassword: hashedPassword,
  });
  await newUser.save();

  return new Response(JSON.stringify(ctx.state.body));
}

function validator(req: Request, body: unknown): Response | null {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  const validateUserResp = validateUser(body);
  if (validateUserResp) return validateUserResp;

  return null;
}
