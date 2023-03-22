import { IconType } from "https://esm.sh/react-icons@4.8.0?alias=react:preact/compat";
import { FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import useCurrentUser from "../../hooks/useCurrentUser.ts";
import useLoginModal from "../../hooks/useLoginModal.ts";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: FunctionalComponent<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      console.log(currentUser);
      console.log(auth);
      window.location.assign(href);
    }
  }, [onClick, loginModal, auth, currentUser]);

  return (
    <div onClick={handleClick} class="flex flex-row items-center">
      <div class="
          relative 
          rounded-full 
          h-14 
          w-14 
          flex 
          items-center 
          justify-center 
          p-4 
          hover:bg-gray-900
          cursor-pointer 
          lg:hidden
        ">
        <Icon size={28} color="white" />
      </div>
      <div class="
          relative 
          hidden 
          lg:flex 
          items-center 
          gap-4 
          p-4 
          rounded-full 
          hover:bg-gray-900
          cursor-pointer 
        ">
        <Icon size={24} color="white" />
        <p class="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
