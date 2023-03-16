import { FunctionalComponent } from "preact";

const FollowBar: FunctionalComponent = () => {
  return (
    <div class="px-6 py-4 hidden lg:block">
      <div class="bg-gray-900 rounded-xl p-4">
        <h2 class="text-white text-xl font-semibold">
          Who to follow
        </h2>
        <div class="flex flex-col gap-6 mt-4">
          {/* TODO USER LIST */}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
