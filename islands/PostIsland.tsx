import {
  SpinnerRoundFilled,
} from "https://esm.sh/spinners-react@1.0.7?alias=react:preact/compat&deps=preact@10.11.0";

import PostItem from "../components/posts/PostItem.tsx";
import usePost from "../hooks/usePost.ts";
import Form from "./Form.tsx";

const UserIsland = ({ postId }) => {
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full pt-10">
        <SpinnerRoundFilled
          thickness={125}
          speed={200}
          color="#3498db"
          style={{ width: "60%" }}
        />
      </div>
    );
  }

  return (
    <div>
      {console.log(fetchedPost)}
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Leave a comment"
      />
    </div>
  );
};

export default UserIsland;
