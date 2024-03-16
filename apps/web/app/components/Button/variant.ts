import { tv } from "tailwind-variants";

export const button = tv({
  base: "btn",
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-error",
      text: "btn-ghost",
      link: "btn-link",
    },
  },
});
