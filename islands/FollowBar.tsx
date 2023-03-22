import type { FunctionalComponent } from "preact";
import { SpinnerRoundFilled } from "https://esm.sh/spinners-react@1.0.7?alias=react:preact/compat&deps=preact@10.11.0";

import useUsers from "../hooks/useUsers.ts";
import Avatar from "../components/Avatar.tsx";

const FollowBar: FunctionalComponent = () => {
  const { data: users = [], isLoading } = useUsers();

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-trueGray-900 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">
          Who to follow
        </h2>
        {isLoading || users.length === 0
          ? (
            <div className="flex justify-center items-center h-full pt-5">
              <SpinnerRoundFilled
                thickness={125}
                speed={200}
                color="#3498db"
                style={{ width: "70%" }}
              />
            </div>
          )
          : (
            <div className="flex flex-col gap-6 mt-4">
              {users.map((user: Record<string, any>) => (
                <div key={user._id} className="flex flex-row gap-4">
                  <Avatar userId={user._id} />
                  <div className="flex flex-col">
                    <p className="text-white font-semibold text-sm">
                      {user.name}
                    </p>
                    <p className="text-trueGray-400 text-sm">
                      @{user.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default FollowBar;
