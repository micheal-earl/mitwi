import { FunctionalComponent } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
} from "https://esm.sh/react-icons@4.8.0/ai?alias=react:preact/compat";
import { formatDistanceToNowStrict } from "https://esm.sh/date-fns@2.29.3";

import useLoginModal from "../../hooks/useLoginModal.ts";
import useCurrentUser from "../../hooks/useCurrentUser.ts";
import useLike from "../../hooks/useLike.ts";
import Avatar from "../Avatar.tsx";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: FunctionalComponent<PostItemProps> = (
  { data = {}, userId },
) => {
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data._id, userId });

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    window.location.assign(`/users/${data.user._id}`);
  }, [data.user._id]);

  const goToPost = useCallback(() => {
    window.location.assign(`/posts/${data._id}`);
  }, [data.id]);

  const onLike = useCallback(/*async*/ (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-gray-400 
        border-opacity-30
        p-5 
        cursor-pointer 
        hover:bg-gray-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user._id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-trueGray-400
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-trueGray-400 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {data.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="
                flex 
                flex-row 
                items-center 
                text-trueGray-400
                gap-2 
                cursor-pointer 
                transition 
                hover:text-blue-400
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-trueGray-400
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
