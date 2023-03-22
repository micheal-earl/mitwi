import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks/";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";

import Input from "../components/Input.tsx";
import Modal from "../components/Modal.tsx";
import useLoginModal from "../hooks/useLoginModal.ts";
import useRegisterModal from "../hooks/useRegisterModal.ts";

const LoginModal: FunctionalComponent = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const reset = () => {
    setPassword("");
    setUsername("");
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axiod.post("/api/auth/login", {
        username,
        password,
      });

      toast.success("Logged in!", toastOptions);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", toastOptions);
    } finally {
      setIsLoading(false);
      loginModal.onClose();
      reset();
    }
  }, [loginModal, username, password]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const bodyContent = (
    <div class="flex flex-col gap-4">
      <Input
        placeholder="Username"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setUsername(e.target.value);
          }
        }}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setPassword(e.target.value);
          }
        }}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div class="text-gray-400 text-center mt-4">
      <p>
        First time using Mitwi?
        <span
          onClick={onToggle}
          class="
            text-white
            cursor-pointer
            hover:underline
            ml-3
          "
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={() => {
        reset();
        loginModal.onClose();
      }}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
