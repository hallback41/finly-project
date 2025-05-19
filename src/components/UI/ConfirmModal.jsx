import React, { useRef, useEffect } from "react";
import Modal from "./Modal";
import styles from "./ConfirmModal.module.scss";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmText = "Confirm",
  cancelText = "Back",
  className,
  onKeyDown,
}) => {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (open && confirmBtnRef.current) {
      confirmBtnRef.current.focus();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className={className}>
      <h2 className={styles.modalTitle}>{title}</h2>
      <div className={styles.modalBtns}>
        <button className={`${styles.modalBtn} ${styles.modalBtnBack}`} onClick={onClose}>
          {cancelText}
        </button>
        <button
          className={`${styles.modalBtn} ${styles.modalBtnConfirm}`}
          onClick={onConfirm}
          ref={confirmBtnRef}
          type="button"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
