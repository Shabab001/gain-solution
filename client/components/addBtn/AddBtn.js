import { useState } from "react";
import styles from "./AddBtn.module.css";
import Modal from "../modal/Modal";
const AddBtn = ({ text }) => {
  const [modal, setModal] = useState(false);
  const handleBtn = () => {
    setModal(true);
  };
  return (
    <>
      <div className={styles.add} onClick={handleBtn}>
        <p>Add {text}</p>
      </div>
      <Modal
        onClose={() => setModal(false)}
        show={modal}
        title={`Add ${text}`}
        type={text}
      />
    </>
  );
};

export default AddBtn;
