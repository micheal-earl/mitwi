import { FunctionalComponent } from "preact";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick: () => void;
}

const Button: FunctionalComponent<ButtonProps> = ({
  label, 
  secondary, 
  fullWidth, 
  large, 
  disabled, 
  outline, 
  onClick 
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      class={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? "w-full" : "w-fit"}
        ${secondary ? "bg-white" : "bg-blue-400"}
        ${secondary ? "text-black" : "text-white"}
        ${secondary ? "border-black" : "border-blue-400"}
        ${large ? "text-xl" : "text-md"}
        ${large ? "px-5" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-white" : ""}
        ${outline ? "text-white" : ""}
      `}

    >
      {label}
    </button>
  );
}

export default Button