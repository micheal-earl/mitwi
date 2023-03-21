import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";

import key from "../../../utils/jwtkey.ts";

interface Token {
  id: string;
  name: string;
}

interface State {
  body: JSON;
  token: Token | null;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  // AUTH MIDDLEWARE ----------
  ctx.state.token = await auth(req);
  // AUTH MIDDLEWARE ----------

  // LOGG MIDDLEWARE ----------
  log(req, ctx.state.token);
  // LOGG MIDDLEWARE ----------

  // JSON MIDDLEWARE ----------
  const text = await req.text();
  ctx.state.body = text ? JSON.parse(text) : null;
  // JSON MIDDLEWARE ----------

  const resp = await ctx.next();
  return resp;
}

async function auth(req: Request): Promise<Token | null> {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const token = cookieHeader.match(/jwt=([^\s;]+)/)?.[1];
  if (!token) return null;

  try {
    const decoded = await verify(token, key);
    return decoded.payload as Token;
  } catch {
    return null;
  }
}

function log(req: Request, token: Token | null): void {
  const timestamp = new Date().toISOString();
  console.log("");
  if (token) console.log("🔑 Verified Request", token);
  if (!token) console.error("🔒 Unverified Request");
  console.log(
    `[${timestamp}] 🌐 New ${req.method} request from ${
      req.headers.get("Host")
    } -> ${req.url}`,
  );
}
