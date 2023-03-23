import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";

import useLoginModal from "../hooks/useLoginModal.ts";
import useRegisterModal from "../hooks/useRegisterModal.ts";
import useCurrentUser from "../hooks/useCurrentUser.ts";
import usePosts from "../hooks/usePosts.ts";
import usePost from "../hooks/usePost.ts";

import Avatar from "../components/Avatar.tsx";
import Button from "../components/Button.tsx";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: FunctionalComponent<FormProps> = (
  { placeholder, isComment, postId },
) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: FIX COMMENT URL
      const url = isComment ? `/api/comments/new/${postId}` : "/api/posts/new";

      await axiod.post(url, { body });

      toast.success("Tweet Created!", toastOptions);
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-gray-400 border-opacity-30 px-5 py-2">
      {currentUser
        ? (
          <div className="flex flex-row gap-4">
            <div>
              <Avatar userId={currentUser?._id} />
            </div>
            <div className="w-full">
              <textarea
                disabled={isLoading}
                onChange={(event) => setBody(event.target.value)}
                value={body}
                className="
                  disabled:opacity-80
                  peer
                  resize-none 
                  mt-3 
                  w-full 
                  bg-black 
                  ring-0 
                  outline-none 
                  text-[20px] 
                  placeholder-neutral-500 
                  text-white
                "
                placeholder={placeholder}
              >
              </textarea>
              <hr className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition" />
              <div className="mt-4 flex flex-row justify-end">
                <Button
                  disabled={isLoading || !body}
                  onClick={onSubmit}
                  label="Tweet"
                />
              </div>
            </div>
          </div>
        )
        : (
          <div className="py-8">
            <h1 className="text-white text-2xl text-center mb-4 font-bold">
              Welcome to Mitwi
            </h1>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button label="Login" onClick={loginModal.onOpen} />
              <Button
                label="Register"
                onClick={registerModal.onOpen}
                secondary
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Form;
