import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.178.0/http/cookie.ts";

import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export function handler(req: Request, ctx: HandlerContext) {
  const validatorResp = validator(req);
  if (validatorResp) return validatorResp;

  const token = ctx.state.token as Token;
  if (!token) {
    return new Response(
      JSON.stringify({ error: "You are not logged in!" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // set the JWT as a secure cookie on the user's browser
  const myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  setCookie(myHeaders, {
    name: "jwt",
    value: "invalid",
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 10,
  });

  const response = new Response(
    JSON.stringify({ message: "User successfully logged out" }),
    {
      status: 302,
      headers: myHeaders,
    },
  );

  return response;
}

function validator(req: Request): Response | null {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  return null;
}
