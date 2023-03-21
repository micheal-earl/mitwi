import axiod from "https://deno.land/x/axiod/mod.ts";

const fetcher = (url: string) => axiod.get(url).then((res) => res.data);

export default fetcher;
