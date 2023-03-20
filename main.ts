/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import connectToDatabase from "./models/db.ts";
connectToDatabase();

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import "https://deno.land/std@0.180.0/dotenv/load.ts";

const PORT = Number(Deno.env.get("PORT")) || 8000;

await start(manifest, { plugins: [twindPlugin(twindConfig)], port: PORT });
