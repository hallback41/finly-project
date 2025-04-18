// components/UI/motion/FadeSlideIn.jsx
import { motion } from "framer-motion";

const FadeSlideIn = ({ children, className = "", direction = "top", duration = 0.6, delay = 0, trigger = true }) => {
  const offset = "100%"; // Больше отступ — лучше видно "выезд снизу"

  const variants = {
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
    bottom: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    right: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
  };

  const selected = variants[direction] || variants.top;

  return (
    <motion.div
      key={String(trigger)}
      variants={selected}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeSlideIn;
