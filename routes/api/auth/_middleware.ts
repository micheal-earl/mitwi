import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  // data: string;
  body: JSON;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  // ctx.state.data = "myData";
  const text = await req.text();
  ctx.state.body = text ? JSON.parse(text) : null;
  const resp = await ctx.next();
  return resp;
}
