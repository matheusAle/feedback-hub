import clsx from "clsx";
import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";

type Props = {
  name: string;
  label?: string;
  id?: string;
  required?: boolean;
  className?: string;
  onChange?: () => void;
  value?: number | null;
};

export const FormStarRating = ({
  name,
  id,
  label,
  className,
  required,
  value,
  onChange,
}: Props) => {
  const [rating, setRating] = useState<number | null>(() => value || null);
  const localId = id || name;

  useEffect(() => {
    setRating(value || null);
  }, [value, setRating]);

  return (
    <div className={clsx("form-control relative", className)}>
      {label && (
        <label className="label" htmlFor={localId}>
          <span className="label-text">{label}</span>
        </label>
      )}

      <StarRating
        rate={rating}
        setRate={(value) => {
          setRating(value);
          onChange?.();
        }}
        size="lg"
        className="p-2 -mt-2"
      />

      <input
        className="w-[1] h-[1] opacity-0 absolute inset-0 pointer-events-none"
        name={name}
        id={localId}
        type="number"
        value={rating || ""}
        readOnly
        required={required}
      />
    </div>
  );
};
