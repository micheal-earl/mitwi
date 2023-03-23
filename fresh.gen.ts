// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/api/_middleware.ts";
import * as $3 from "./routes/api/auth/login.ts";
import * as $4 from "./routes/api/auth/logout.ts";
import * as $5 from "./routes/api/auth/register.ts";
import * as $6 from "./routes/api/comments/id/[id].ts";
import * as $7 from "./routes/api/comments/new/[id].ts";
import * as $8 from "./routes/api/echo.ts";
import * as $9 from "./routes/api/follow/delete/[id].ts";
import * as $10 from "./routes/api/follow/new/[id].ts";
import * as $11 from "./routes/api/like/delete.ts";
import * as $12 from "./routes/api/like/new.ts";
import * as $13 from "./routes/api/posts/all.ts";
import * as $14 from "./routes/api/posts/id/[id].ts";
import * as $15 from "./routes/api/posts/new.ts";
import * as $16 from "./routes/api/posts/user/[id].ts";
import * as $17 from "./routes/api/users/all.ts";
import * as $18 from "./routes/api/users/edit.ts";
import * as $19 from "./routes/api/users/id/[id].ts";
import * as $20 from "./routes/api/users/me.ts";
import * as $21 from "./routes/index.tsx";
import * as $22 from "./routes/posts/[postId].tsx";
import * as $23 from "./routes/users/[userId].tsx";
import * as $$0 from "./islands/CommentFeed.tsx";
import * as $$1 from "./islands/EditModal.tsx";
import * as $$2 from "./islands/FollowBar.tsx";
import * as $$3 from "./islands/Form.tsx";
import * as $$4 from "./islands/IndexIsland.tsx";
import * as $$5 from "./islands/LoginModal.tsx";
import * as $$6 from "./islands/PostFeed.tsx";
import * as $$7 from "./islands/PostIsland.tsx";
import * as $$8 from "./islands/RegisterModal.tsx";
import * as $$9 from "./islands/Sidebar.tsx";
import * as $$10 from "./islands/SidebarTweetButton.tsx";
import * as $$11 from "./islands/Toast.tsx";
import * as $$12 from "./islands/UserBio.tsx";
import * as $$13 from "./islands/UserHero.tsx";
import * as $$14 from "./islands/UserIsland.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/api/_middleware.ts": $2,
    "./routes/api/auth/login.ts": $3,
    "./routes/api/auth/logout.ts": $4,
    "./routes/api/auth/register.ts": $5,
    "./routes/api/comments/id/[id].ts": $6,
    "./routes/api/comments/new/[id].ts": $7,
    "./routes/api/echo.ts": $8,
    "./routes/api/follow/delete/[id].ts": $9,
    "./routes/api/follow/new/[id].ts": $10,
    "./routes/api/like/delete.ts": $11,
    "./routes/api/like/new.ts": $12,
    "./routes/api/posts/all.ts": $13,
    "./routes/api/posts/id/[id].ts": $14,
    "./routes/api/posts/new.ts": $15,
    "./routes/api/posts/user/[id].ts": $16,
    "./routes/api/users/all.ts": $17,
    "./routes/api/users/edit.ts": $18,
    "./routes/api/users/id/[id].ts": $19,
    "./routes/api/users/me.ts": $20,
    "./routes/index.tsx": $21,
    "./routes/posts/[postId].tsx": $22,
    "./routes/users/[userId].tsx": $23,
  },
  islands: {
    "./islands/CommentFeed.tsx": $$0,
    "./islands/EditModal.tsx": $$1,
    "./islands/FollowBar.tsx": $$2,
    "./islands/Form.tsx": $$3,
    "./islands/IndexIsland.tsx": $$4,
    "./islands/LoginModal.tsx": $$5,
    "./islands/PostFeed.tsx": $$6,
    "./islands/PostIsland.tsx": $$7,
    "./islands/RegisterModal.tsx": $$8,
    "./islands/Sidebar.tsx": $$9,
    "./islands/SidebarTweetButton.tsx": $$10,
    "./islands/Toast.tsx": $$11,
    "./islands/UserBio.tsx": $$12,
    "./islands/UserHero.tsx": $$13,
    "./islands/UserIsland.tsx": $$14,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
