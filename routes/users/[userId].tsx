import Header from "../../components/Header.tsx";
import UserIsland from "../../islands/UserIsland.tsx";
import { PageProps } from "$fresh/server.ts";
import PostFeed from "../../islands/PostFeed.tsx";

export default function userView(props: PageProps) {
  return (
    <div>
      <Header showBackArrow={true} label="User Profile" />
      <UserIsland userId={props.params.userId} />
    </div>
  );
}
