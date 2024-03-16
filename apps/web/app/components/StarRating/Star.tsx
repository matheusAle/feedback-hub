import { useAnimation, motion, Variants } from "framer-motion";
import { useEffect } from "react";
import styles from "./Star.module.css";
import clsx from "clsx";

const starVariants: Variants = {
  initial: {
    scale: 1,
    color: "var(--color)",
  },
  animate: ({ i }) => ({
    scale: 1,
    color: "var(--color-active)",
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: "spring",
      stiffness: 175,
    },
  }),
  hovered: ({ i }) => ({
    scale: 1.2,
    transition: {
      delay: i * 0.04,
      duration: 0.2,
    },
  }),
};

type StartProps = {
  i: number;
  isHoveringWrapper: boolean;
  isClicked: boolean;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
};

export const Star = ({
  i,
  isHoveringWrapper,
  isClicked,
  size,
  disabled,
}: StartProps) => {
  const starControls = useAnimation();
  const sizeValue = { sm: 16, md: 24, lg: 44 };

  useEffect(() => {
    if (disabled) {
      if (isClicked) {
        starControls.set("animate");
      }
      return;
    }

    if (isClicked) {
      starControls.start("animate");
    } else if (isHoveringWrapper) {
      starControls.start("hovered");
    } else {
      starControls.start("initial");
    }
  }, [isClicked, isHoveringWrapper, starControls, disabled]);

  return (
    <div className={styles.star}>
      <motion.svg
        width={sizeValue[size]}
        height={sizeValue[size]}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={starVariants}
        animate={starControls}
        custom={{ i, isClicked }}
        className={clsx({ "cursor-pointer": !disabled })}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
          strokeWidth="0"
          fill="currentColor"
        />
      </motion.svg>
    </div>
  );
};
