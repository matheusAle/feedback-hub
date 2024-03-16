import clsx from "clsx";
import { useState } from "react";
import { StarRating } from "./StarRating";

type Props = {
  name: string;
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
};

export const FormStarRating = ({
  name,
  id,
  label,
  className,
  required,
}: Props) => {
  const [rating, setRating] = useState<number | null>(null);
  const localId = id || name;

  return (
    <div className={clsx("form-control relative", className)}>
      <label className="label" htmlFor={localId}>
        <span className="label-text">{label}</span>
      </label>

      <StarRating rate={rating} setRate={setRating} size="lg" className="p-2" />

      <input
        className="w-[1] h-[1] opacity-0 absolute inset-0 pointer-events-none"
        name={name}
        id={localId}
        type="number"
        defaultValue={rating || ""}
        required={required}
      />
    </div>
  );
};
