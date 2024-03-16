import clsx from "clsx";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FormField = React.forwardRef<HTMLInputElement, Props>(
  function FormField({ className, name, id, label, ...rest }, ref) {
    const localId = id || name;
    return (
      <label className={clsx("form-control", className)} htmlFor={localId}>
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          ref={ref}
          name={name}
          id={localId}
          className="input input-bordered w-full"
          {...rest}
        />
      </label>
    );
  },
);
