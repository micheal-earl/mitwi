import { FunctionalComponent } from "preact";
import { SpinnerRoundFilled } from "https://esm.sh/spinners-react@1.0.7?alias=react:preact/compat&deps=preact@10.11.0";

import CommentItem from "../components/comments/CommentItem.tsx";

interface CommentFeedProps {
  comments?: Record<string, any>[];
  isLoading: boolean;
}

const CommentFeed: FunctionalComponent<CommentFeedProps> = (
  { comments = [], isLoading },
) => {
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-full pt-10">
  //       <SpinnerRoundFilled
  //         thickness={125}
  //         speed={200}
  //         color="#3498db"
  //         style={{ width: "60%" }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  );
};

export default CommentFeed;
