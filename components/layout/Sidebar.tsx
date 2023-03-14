import { FunctionalComponent } from "preact";
import SidebarLogo from "./SidebarLogo.tsx";
import { BsHouseFill, BsBellFill } from "https://esm.sh/react-icons/bs";
import { FaUser } from "https://esm.sh/react-icons/fa";

const Sidebar: FunctionalComponent = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser
    }
  ]
  return (
    <div class="col-span-1 h-full pr-4 md:pr-6">
      <div class="flex flex-col items-end">
        <div class="space-y-2 lg:w-[230px]">
          <SidebarLogo />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;