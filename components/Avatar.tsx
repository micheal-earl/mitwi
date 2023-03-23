import { FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";

import useUser from "../hooks/useUser.ts";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: FunctionalComponent<AvatarProps> = (
  { userId, isLarge, hasBorder },
) => {
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback((event: any) => {
    event.stopPropagation();

    const url = `/users/${userId}`;

    window.location.assign(url);
  }, [userId]);

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      {
        <img
          // fill
          style={{
            objectFit: "cover",
            borderRadius: "100%",
            width: "100%",
            height: "100%",
          }}
          alt="Avatar"
          onClick={onClick}
          src={fetchedUser?.user.profileImage || "/placeholder.png"}
        />
      }
    </div>
  );
};

export default Avatar;
