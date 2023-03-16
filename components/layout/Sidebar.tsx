import { FunctionalComponent } from "preact";
import {
  BsBellFill,
  BsHouseFill,
} from "https://esm.sh/react-icons@4.8.0/bs?alias=react:preact/compat";
import { BiLogOut } from "https://esm.sh/react-icons@4.8.0/bi?alias=react:preact/compat";
import { FaUser } from "https://esm.sh/react-icons@4.8.0/fa?alias=react:preact/compat";
import SidebarLogo from "./SidebarLogo.tsx";
import SidebarItem from "./SidebarItem.tsx";
import SidebarTweetButton from "./SidebarTweetButton.tsx";

const Sidebar: FunctionalComponent = () => {
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
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
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
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
