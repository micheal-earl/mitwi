import useSWR from "https://esm.sh/swr@2.1.0?alias=react:preact/compat&deps=preact@10.11.0";

import fetcher from "../utils/fetcher.ts";

const useCurrentUser = (id: string) => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/users/id/${id}` : null, fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
