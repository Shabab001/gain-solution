import ReactDOM from "react-dom";
import styles from "./ConfirmModal.module.css";
function ConfirmModal(props) {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div className={styles.confirmModalOverlay}>
      <div className={styles.confirmModal}>
        <div className={styles.confirmModalHeader}>
          {props.headerText && props.headerText}{" "}
          <div
            className={styles.confirmModalCloseBtn}
            onClick={() => props.onClose()}
          >
            <i className={styles} />
          </div>
        </div>
        <div className={styles.confirmModalBody}>
          {props.bodyText && props.bodyText}
        </div>
        <div className={styles.confirmModalFooter}>
          <button
            className=""
            onClick={props.acceptMethod && props.acceptMethod}
          >
            {props.acceptText ? props.acceptText : "Yes"}
          </button>
          <button className="" onClick={props.onClose && props.onClose}>
            {props.declineText ? props.declineText : "No"}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default ConfirmModal;
