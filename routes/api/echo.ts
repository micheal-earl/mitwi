import { HandlerContext } from "$fresh/server.ts";

import validateMethod from "../../validators/method.ts";

export function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "POST");
  if (validateMethodResp) return validateMethodResp;
  return new Response(
    JSON.stringify(ctx.state.body),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
