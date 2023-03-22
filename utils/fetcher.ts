import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

const fetcher = (url: string) => axiod.get(url).then((res) => res.data);

export default fetcher;
