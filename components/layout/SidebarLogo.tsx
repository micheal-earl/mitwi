import { FunctionalComponent } from "preact";
import { BsTwitter } from "https://esm.sh/react-icons@4.8.0/bs?alias=react:preact/compat"

const SidebarLogo: FunctionalComponent = () => {
  return (
    <a 
      href="/"
      class="
        rounded-full 
        h-14 
        w-14 
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-gray-900
        cursor-pointer 
        transition
      "
    >
      <BsTwitter size={28} color="white" />
    </a>
  )
}

export default SidebarLogo;