import Header from "../../components/Header.tsx";
import UserIsland from "../../islands/UserIsland.tsx";
import { PageProps } from "$fresh/server.ts";

export default function UserView(props: PageProps) {
  return (
    <div>
      <Header showBackArrow={true} label="User Profile" />
      <UserIsland userId={props.params.userId} />
    </div>
  );
}
