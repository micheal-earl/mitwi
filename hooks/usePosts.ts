import useSWR from "https://esm.sh/swr@2.1.0?alias=react:preact/compat&deps=preact@10.11.0";

import fetcher from "../utils/fetcher.ts";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts/user/${userId}` : "api/posts/all";
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default usePosts;
