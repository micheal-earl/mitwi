import {
  SpinnerCircular,
  SpinnerRoundFilled,
} from "https://esm.sh/spinners-react?alias=react:preact/compat&deps=preact@10.11.0";

import UserHero from "./UserHero.tsx";
import useUser from "../hooks/useUser.ts";
import UserBio from "./UserBio.tsx";

const UserIsland = ({ userId }) => {
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
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
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {/* <PostFeed userId={userId as string} /> */}
    </div>
  );
};

export default UserIsland;
