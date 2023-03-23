import { useCallback, useMemo } from "preact/hooks";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

import useCurrentUser from "./useCurrentUser.ts";
import usePost from "./usePost.ts";
import useLoginModal from "./useLoginModal.ts";
import usePosts from "./usePosts.ts";

interface useLikeObj {
  postId: string;
  userId?: string;
}

const useLike = ({ postId, userId }: useLikeObj) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?._id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      console.log({ postId });

      if (hasLiked) {
        request = () => axiod.delete(`/api/like/delete`, { postId: postId });
      } else {
        request = () => axiod.put(`/api/like/new`, { postId: postId });
      }

      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success!", toastOptions);
    } catch (e) {
      toast.error("Something went wrong!", toastOptions);
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
