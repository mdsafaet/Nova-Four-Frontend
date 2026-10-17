import { useEffect, useRef } from "react";

import {
  motion as Motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";

export const bounce = {
  type: "spring",
  stiffness: 180,
  damping: 20,
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const reduced = useReducedMotion();

  return (
    <Motion.div
      className={className}
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        ...bounce,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </Motion.div>
  );
}

export function Float({
  children,
  className = "",
  index = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.08,
  });

  const reduced = useReducedMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    const sync = () => {
      controls.stop();

      if (
        inView &&
        !reduced &&
        !document.hidden
      ) {
        controls.start({
          y: [0, -7, 0],
          transition: {
            duration: 5.5 + index * 0.25,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
      } else {
        controls.set({
          y: 0,
        });
      }
    };

    sync();

    document.addEventListener(
      "visibilitychange",
      sync
    );

    return () => {
      controls.stop();

      document.removeEventListener(
        "visibilitychange",
        sync
      );
    };
  }, [
    inView,
    reduced,
    controls,
    index,
  ]);

  return (
    <Motion.div
      ref={ref}
      animate={controls}
      className={`nvx-float ${className}`}
    >
      <Motion.div
        className="nvx-lift"
        whileHover={
          reduced
            ? undefined
            : {
                y: -9,
              }
        }
        transition={bounce}
      >
        {children}
      </Motion.div>
    </Motion.div>
  );
}

export default Reveal;