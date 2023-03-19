import { HandlerContext, Handlers } from "$fresh/server.ts";
//import { PrismaClient, User } from "../../generated/client/deno/edge.ts";
// import { PrismaClient } from "../../generated/client/deno/edge.ts";
// import type { User } from "../../generated/client/deno/edge.ts";

// const prisma = new PrismaClient();

// interface State {
//   data: User[];
// }

// async function handler(req: Request, ctx: HandlerContext<State>) {
//   if (req.method != "GET") return;
//   const newUser = await prisma.user.create({
//     data: {
//       username: "Alice",
//       email: "alice@prisma.io",
//       hashedPassword: "asdf",
//     },
//   });
//   ctx.state.data = await prisma.user.findMany();
//   return new Response(`Data is ${ctx.state.data}`);
// }

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

// export default handler;
