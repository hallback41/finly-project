import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
