import { FunctionalComponent } from "preact";
interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: Event) => void;
}

const Input: FunctionalComponent<InputProps> = (
  { placeholder, value, type = "text", onChange, disabled },
) => {
  return (
    <div class="w-full">
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        class="
          w-full
          p-4 
          text-lg 
          bg-black 
          border-2
          border-neutral-800 
          rounded-md
          outline-none
          text-white
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
};

export default Input;
