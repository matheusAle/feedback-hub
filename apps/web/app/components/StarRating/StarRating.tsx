"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "./Star";

type Props = {
  rate: number | null;
  setRate: (rate: number | null) => void;
  size: "md" | "lg";
};

export const StarRating = ({ rate = null, setRate, size }: Props) => {
  const [isHovering, setIsHovering] = useState<number | null>(null);

  return (
    <div
      className="flex items-center flex-row space-x-2 p-2"
      onMouseLeave={() => setIsHovering(-1)}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          onMouseOver={() => setIsHovering(i)}
          onClick={() => setRate(i)}
          key={i}
        >
          <Star
            size={size}
            i={i}
            isHoveringWrapper={isHovering != null && i <= isHovering}
            isClicked={rate !== null && rate >= i}
          />
        </motion.div>
      ))}
    </div>
  );
};
