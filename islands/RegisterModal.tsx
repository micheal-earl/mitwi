import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks/";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";

import useRegisterModal from "../hooks/useRegisterModal.ts";
import useLoginModal from "../hooks/useLoginModal.ts";
import Input from "../components/Input.tsx";
import Modal from "../components/Modal.tsx";
import { resetWarningCache } from "https://esm.sh/v111/@types/prop-types@15.7.5/X-YS9yZWFjdDpwcmVhY3QvY29tcGF0CmQvcHJlYWN0QDEwLjExLjA/index";

const RegisterModal: FunctionalComponent = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
    setEmail("");
    setName("");
    setPassword("");
    setUsername("");
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axiod.post("/api/auth/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("New account registered!", toastOptions);

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
      registerModal.onClose();
      reset();
    }
  }, [registerModal, email, password, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div class="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setEmail(e.target.value);
          }
        }}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setName(e.target.value);
          }
        }}
        value={name}
        disabled={isLoading}
      />
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
        Already have an account?
        <span
          onClick={onToggle}
          class="
            text-white
            cursor-pointer
            hover:underline
            ml-3
          "
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={() => {
        reset();
        registerModal.onClose();
      }}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
