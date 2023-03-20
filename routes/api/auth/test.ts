import { HandlerContext } from "$fresh/server.ts";

export function handler(req: Request, ctx: HandlerContext) {
  if (req.method != "POST") {
    const resp = new Response(
      JSON.stringify({
        error: "Incorrect HTTP method., route expects GET request.",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
    return resp;
  }
  return new Response(
    JSON.stringify(ctx.state.body),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
