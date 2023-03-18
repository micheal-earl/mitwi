import { create } from "https://esm.sh/zustand@4.3.6?alias=react:preact/compat&deps=preact@10.11.0";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
