import { FunctionalComponent } from "preact";
import {
  BsBellFill,
  BsHouseFill,
} from "https://esm.sh/react-icons@4.8.0/bs?alias=react:preact/compat";
import { BiLogOut } from "https://esm.sh/react-icons@4.8.0/bi?alias=react:preact/compat";
import { FaUser } from "https://esm.sh/react-icons@4.8.0/fa?alias=react:preact/compat";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

import SidebarLogo from "../components/layout/SidebarLogo.tsx";
import SidebarItem from "../components/layout/SidebarItem.tsx";
import SidebarTweetButton from "./SidebarTweetButton.tsx";
import useCurrentUser from "../hooks/useCurrentUser.ts";

const Sidebar: FunctionalComponent = () => {
  const { data: currentUser } = useCurrentUser();

  const logOut = async () => {
    try {
      await axiod.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?._id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div class="col-span-1 h-full pr-4 md:pr-6">
      <div class="flex flex-col items-end">
        <div class="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem onClick={logOut} icon={BiLogOut} label="Logout" />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
