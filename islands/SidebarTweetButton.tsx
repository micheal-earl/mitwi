import { FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { FaFeather } from "https://esm.sh/react-icons@4.8.0/fa?alias=react:preact/compat";
import useLoginModal from "../hooks/useLoginModal.ts";

const SidebarTweetButton: FunctionalComponent = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, []);

  return (
    <div onClick={onClick}>
      <div class="
          mt-6
          lg:hidden
          rounded-full
          h-14
          w-14
          p-4
          flex
          items-center
          justify-center
          bg-blue-400
          hover:bg-opacity-80
          transition
          cursor-pointer
        ">
        <FaFeather size={24} color="white" />
      </div>
      <div class="
          mt-5
          hidden
          lg:block
          px-4
          py-2
          rounded-full
          bg-blue-400
          hover:bg-opacity-90
          cursor-pointer
          transition
        ">
        <p class="
            hidden 
            lg:block 
            text-center 
            font-semibold 
            text-white 
            text-[20px]
          ">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
