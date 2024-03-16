"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "./Star";
import clsx from "clsx";

type Props = {
  rate: number | null;
  setRate?: (rate: number | null) => void;
  size: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
};

export const StarRating = ({
  rate = null,
  setRate,
  size,
  className,
  disabled,
}: Props) => {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  return (
    <div
      className={clsx("flex items-center flex-row space-x-2", className)}
      onMouseLeave={() => setIsHovering(-1)}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          onMouseOver={() => setIsHovering(i)}
          onClick={() => setRate?.(i)}
          key={i}
        >
          <Star
            size={size}
            i={i}
            disabled={disabled}
            isHoveringWrapper={
              isHovering != null && i <= isHovering && !disabled
            }
            isClicked={rate !== null && rate >= i}
          />
        </motion.div>
      ))}
    </div>
  );
};
