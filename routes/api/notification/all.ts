import { HandlerContext } from "$fresh/server.ts";

import NotificationModel from "../../../models/Notification.ts";
import UserModel from "../../../models/User.ts";
import validateMethod from "../../../validators/method.ts";

interface Token {
  id: string;
  name: string;
}

export async function handler(req: Request, ctx: HandlerContext) {
  const validateMethodResp = validateMethod(req, "GET");
  if (validateMethodResp) return validateMethodResp;

  const token = ctx.state.token as Token;
  if (!token) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const notifications = await NotificationModel.find({ user: token.id });
    const user = await UserModel.findById(token.id);
    if (user) {
      user.hasNotification = false;
      await user.save();
    }

    return new Response(
      JSON.stringify(notifications),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Cannot find posts by provided user ID" }),
      {
        status: 409,
      },
    );
  }
}
