import { FunctionalComponent } from "preact";
import { SpinnerRoundFilled } from "https://esm.sh/spinners-react@1.0.7?alias=react:preact/compat&deps=preact@10.11.0";

import usePosts from "../hooks/usePosts.ts";
import PostItem from "../components/posts/PostItem.tsx";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: FunctionalComponent<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  if (isLoading) {
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
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem
          userId={userId}
          key={post.id}
          data={post}
        />
      ))}
    </>
  );
};

export default PostFeed;
