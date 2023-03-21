import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.178.0/http/cookie.ts";

import validateMethod from "../../../validators/method.ts";

export function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;

  // const myHeaders = new Headers({
  //   "Content-Type": "application/json",
  // });

  // setCookie(myHeaders, {
  //   name: "jwt",
  //   value: "hello",
  //   httpOnly: true,
  //   secure: true,
  //   maxAge: 60 * 60 * 24 * 7, // expire time of one week
  // });

  return new Response(
    JSON.stringify(ctx.state.body),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
