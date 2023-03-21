import { HandlerContext } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { setCookie } from "https://deno.land/std@0.178.0/http/cookie.ts";

import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";
import validateUser from "../../../validators/user-login.ts";
import key from "../../../utils/jwtkey.ts";

interface UserForLogin {
  username: string;
  password: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validatorResp = validator(req, ctx.state.body);
  if (validatorResp) return validatorResp;

  const { username, password } = ctx.state.body as UserForLogin;

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    return new Response(
      JSON.stringify({ error: "User does not exist" }),
      {
        status: 409,
      },
    );
  }

  const confirmPassword = await bcrypt.compare(
    password,
    existingUser.hashedPassword,
  );
  if (!confirmPassword) {
    return new Response(
      JSON.stringify({ error: "Password is incorrect" }),
      {
        status: 409,
      },
    );
  }

  const payload = {
    id: existingUser._id,
    name: username,
  };
  const jwt = await create({ alg: "HS512", typ: "JWT" }, { payload }, key);

  // set the JWT as a secure cookie on the user's browser
  const myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  setCookie(myHeaders, {
    name: "jwt",
    value: jwt,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // expire time of one week
  });

  const response = new Response(
    JSON.stringify({ message: "User successfully authenticated" }),
    {
      status: 200,
      headers: myHeaders,
    },
  );

  return response;
}

function validator(req: Request, body: unknown): Response | null {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  const validateUserResp = validateUser(body);
  if (validateUserResp) return validateUserResp;

  return null;
}
