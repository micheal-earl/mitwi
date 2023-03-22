import { FunctionalComponent } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks/";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import {
  toast,
  ToastOptions,
} from "https://esm.sh/react-toastify@9.1.1?alias=react:preact/compat&deps=preact@10.11.0";

import Input from "../components/Input.tsx";
import Modal from "../components/Modal.tsx";
import useEditModal from "../hooks/useEditModal.ts";
import useCurrentUser from "../hooks/useCurrentUser.ts";
import useUser from "../hooks/useUser.ts";

const LoginModal: FunctionalComponent = () => {
  const editModal = useEditModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

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

      await axiod.put("/api/users/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();

      toast.info("User edited", toastOptions);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", toastOptions);
    } finally {
      setIsLoading(false);
      editModal.onClose();
    }
  }, [editModal, name, username, bio, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
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
        placeholder="Bio"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setBio(e.target.value);
          }
        }}
        value={bio}
        disabled={isLoading}
      />
      <Input
        placeholder="Avatar URL"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setProfileImage(e.target.value);
          }
        }}
        value={profileImage}
        disabled={isLoading}
      />
      <Input
        placeholder="Cover Image URL"
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setCoverImage(e.target.value);
          }
        }}
        value={coverImage}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={() => editModal.onClose()}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default LoginModal;
