import { FunctionalComponent } from "preact";
import { FaFeather } from "https://esm.sh/react-icons@4.8.0/fa?alias=react:preact/compat";

const SidebarTweetButton: FunctionalComponent = () => {
  return (
    <a href="/">
      <div
        class="
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
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        class="
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
        "
      >
        <p
          class="
            hidden 
            lg:block 
            text-center 
            font-semibold 
            text-white 
            text-[20px]
          "
        >
          Tweet
        </p>
      </div>
    </a>
  );
};

export default SidebarTweetButton;
