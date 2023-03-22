import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";
import { BiCalendar } from "https://esm.sh/react-icons@4.8.0/bi?alias=react:preact/compat";
import { format } from "https://esm.sh/date-fns@2.29.3";

import useCurrentUser from "../hooks/useCurrentUser.ts";
import useUser from "../hooks/useUser.ts";
// import useFollow from "../hooks/useFollow.ts";
import useEditModal from "../hooks/useEditModal.ts";
import Button from "../components/Button.tsx";

interface UserBioProps {
  userId: string;
}

const UserBio: FunctionalComponent<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  // const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.user.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser?.user.createdAt), "MMMM yyyy");
  }, [fetchedUser?.user.createdAt]);

  return (
    <div className="border-b-[1px] border-gray-400 border-opacity-30 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?._id === userId
          ? <Button secondary label="Edit" onClick={editModal.onOpen} />
          : (
            <Button
              label={false ? "Unfollow" : "Follow"}
            />
          )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.user.name}
          </p>
          <p className="text-md text-trueGray-400">
            @{fetchedUser?.user.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {fetchedUser?.user.bio}
          </p>
          <div className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-trueGray-400
          ">
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
              {fetchedUser?.user.followingIds?.length}
            </p>
            <p className="text-trueGray-400">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-trueGray-400">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
