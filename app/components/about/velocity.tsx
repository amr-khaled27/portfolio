import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import "../../styles/velocity.css";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  style?: string;
}

const ParallaxText = React.memo<ParallaxProps>(
  ({ children, baseVelocity = 100, style }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
      mass: 1,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy =
        (directionFactor.current * baseVelocity * (delta / 1000)) / 10;
      const currentVelocityFactor = velocityFactor.get();
      if (currentVelocityFactor < 0) {
        directionFactor.current = -1;
      } else if (currentVelocityFactor > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * currentVelocityFactor;

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div className="parallax text-white">
        <motion.div className={`scroller ${style}`} style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
    );
  }
);

ParallaxText.displayName = "ParallaxText";

const MemoizedParallaxText = React.memo(
  ParallaxText,
  (prevProps, nextProps) => {
    return (
      prevProps.children === nextProps.children &&
      prevProps.baseVelocity === nextProps.baseVelocity &&
      prevProps.style === nextProps.style
    );
  }
);

export default MemoizedParallaxText;
