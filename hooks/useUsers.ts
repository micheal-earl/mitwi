import useSWR from "https://esm.sh/swr@2.1.0?alias=react:preact/compat&deps=preact@10.11.0";

import fetcher from "../utils/fetcher.ts";

const useUsers = () => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/users/all", fetcher);

  console.log("USE USERS HOOK: ", data);

  return { data, error, isLoading, mutate };
};

export default useUsers;
