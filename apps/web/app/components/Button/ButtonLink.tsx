import { VariantProps } from "tailwind-variants";
import { clsx } from "clsx";
import React from "react";
import { Link, LinkProps } from "@remix-run/react";
import { button } from "./variant";

type Props = LinkProps & VariantProps<typeof button>;

export const ButtonLink = React.forwardRef<HTMLAnchorElement, Props>(
  function Button({ className, variant = "primary", children, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        className={clsx(button({ variant }), className)}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);
