import { apply, css } from "twind/css";

export const globalStyles = css({
  ":global": {
    ":root": apply`h-full bg-black`,
    body: apply`h-full bg-black`,
  },
});
