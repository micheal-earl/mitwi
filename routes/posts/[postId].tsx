import Header from "../../components/Header.tsx";
import { PageProps } from "$fresh/server.ts";
import PostIsland from "../../islands/PostIsland.tsx";

export default function PostView(props: PageProps) {
  return (
    <div>
      <Header showBackArrow={true} label="Post" />
      <PostIsland postId={props.params.postId} />
    </div>
  );
}
