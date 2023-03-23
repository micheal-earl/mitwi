import { BsTwitter } from "https://esm.sh/react-icons@4.8.0/bs?alias=react:preact/compat";
import { useEffect } from "preact/hooks";

import useNotifications from "../hooks/useNotifications.ts";
import useCurrentUser from "../hooks/useCurrentUser.ts";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(
    currentUser?._id,
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-gray-300 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-gray-400 border-opacity-30"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
