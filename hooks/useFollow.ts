import { useCallback, useMemo } from "preact/hooks";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

import useCurrentUser from "./useCurrentUser.ts";
import useUser from "./useUser.ts";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    try {
      let request;

      if (isFollowing) {
        request = () => axiod.delete(`/api/follow/delete/${userId}`);
      } else {
        request = () => axiod.put(`/api/follow/new/${userId}`);
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success!", toastOptions);
    } catch (e) {
      toast.error("Something went wrong!", toastOptions);
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
