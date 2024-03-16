import { VariantProps } from "tailwind-variants";
import { clsx } from "clsx";
import React from "react";
import { button } from "./variant";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    children: React.ReactNode;
    loading?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    { className, variant = "primary", children, loading, disabled, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={clsx(button({ variant }), className)}
        disabled={loading || disabled}
        {...rest}
      >
        {loading && <span className="loading loading-spinner"></span>}

        {children}
      </button>
    );
  },
);
