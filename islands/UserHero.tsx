import { FunctionalComponent } from "preact";

import useUser from "../hooks/useUser.ts";
import Avatar from "../components/Avatar.tsx";

interface UserHeroProps {
  userId: string;
}

const UserHero: FunctionalComponent<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-trueGray-700 h-44 relative">
        {fetchedUser?.user.coverImage && (
          <img
            src={fetchedUser.user.coverImage}
            alt="Cover Image"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
