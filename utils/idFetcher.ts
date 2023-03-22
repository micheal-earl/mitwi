import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

const fetcher = (url: string, id: string) =>
  axiod.post(url, { id: id }).then((res) => res.data);

export default fetcher;
