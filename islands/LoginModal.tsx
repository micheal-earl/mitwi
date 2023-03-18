import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks/";
import useLoginModal from "../hooks/useLoginModal.ts";
import Input from "../components/Input.tsx";
import Modal from "../components/Modal.tsx";

const LoginModal: FunctionalComponent = () => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO ADD LOGIN
      await (() => 1)();

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  // const onToggle = useCallback(() => {
  //   loginModal.onClose();
  //   registerModal.onOpen();
  // }, [loginModal registerModal]);

  const bodyContent = (
    <div class="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  // const footerContent = (
  //   <div class="text-gray-900 text-center mt-4">
  //     <p class="text-white">
  //       First time using Mitwi?
  //       <span
  //         onClick={onToggle}
  //         class="
  //           text-white
  //           cursor-pointer
  //           hover:underline
  //           ml-3
  //         "
  //       >
  //         Create an account
  //       </span>
  //     </p>
  //   </div>
  // );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default LoginModal;
