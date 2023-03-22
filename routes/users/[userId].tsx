import Header from "../../components/Header.tsx";
import UserIsland from "../../islands/UserIsland.tsx";
import { PageProps } from "$fresh/server.ts";

const UserView = (props: PageProps) => {
  return (
    <>
      <Header showBackArrow={true} label="User Profile" />
      <UserIsland userId={props.params.userId} />
    </>
  );
};

export default UserView;
