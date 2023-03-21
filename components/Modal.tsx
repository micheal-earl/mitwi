import { useCallback } from "preact/hooks/";
import { FunctionalComponent, VNode } from "preact";
import { AiOutlineClose } from "https://esm.sh/react-icons@4.8.0/ai?alias=react:preact/compat";
import Button from "./Button.tsx";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: VNode;
  footer?: VNode;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return <div class="hidden"></div>;
  }

  return (
    <>
      <div class="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-gray-900
          bg-opacity-60
        ">
        <div class="relative w-full lg:w-2/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* Content */}
          <div class="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            ">
            {/*header*/}
            <div class="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              ">
              <h3 class="text-3xl font-semibold text-white">
                {title}
              </h3>
              <button
                class="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div class="relative p-5 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div class="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
