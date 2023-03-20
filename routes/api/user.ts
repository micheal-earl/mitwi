import { HandlerContext, Handlers } from "$fresh/server.ts";
import mongoose from "../../models/db.ts";
import UserModel from "../../models/User.ts";

export async function handler(_req: Request, _ctx: HandlerContext) {
  try {
    // get all todo list
    const user = await UserModel.find();

    // return todo
    return Response.json(JSON.stringify(user));
  } catch (error) {
    return new Response(error);
  }
}

// const handler: Handlers = {
//   async GET(_, ctx) {
//     const newUser = await prisma.user.create({
//       data: {
//         username: "Alice",
//         email: "alice@prisma.io",
//         hashedPassword: "asdf",
//       },
//     });
//     const users = await prisma.user.findMany();
//     return ctx.render(users);
//   },
// };

// const handler = (_req: Request, _ctx: HandlerContext): Response => {
//   GET(req, ctx) {

//   }
//   const body = updateDb();
//   return new Response(body);
// };

// const updateDb = async () => {
//   const newUser = await prisma.user.create({
//     data: {
//       username: "Alice",
//       email: "alice@prisma.io",
//       hashedPassword: "asdf",
//     },
//   });
//   const users = await prisma.user.findMany();
//   return users;
// };
