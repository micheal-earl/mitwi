import { FunctionalComponent } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import { formatDistanceToNowStrict } from "https://esm.sh/date-fns@2.29.3";

import Avatar from "../Avatar.tsx";
import useUser from "../../hooks/useUser.ts";

interface CommentItemProps {
  comment: Record<string, any>;
}

const CommentItem: FunctionalComponent<CommentItemProps> = (
  { comment = {} },
) => {
  const { data, isLoading } = useUser(comment.user);

  // console.log(comment.user);
  // console.log(comment);
  console.log(data);

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    window.location.assign(`/users/${comment.user}`);
  }, [comment.user]);

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment?.createdAt]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div
      onClick={goToUser}
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
        <Avatar userId={comment.user} />
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
              {data?.user.name}
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
              @{data?.user.username}
            </span>
            <span className="text-trueGray-400 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {comment.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
