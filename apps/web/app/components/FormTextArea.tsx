import clsx from "clsx";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export const FormTextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  function FormTextArea({ className, name, id, label, ...rest }, ref) {
    const localId = id || name;
    return (
      <label className={clsx("form-control", className)} htmlFor={localId}>
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          ref={ref}
          name={name}
          id={localId}
          className="textarea input-bordered w-full"
          {...rest}
        />
      </label>
    );
  },
);
