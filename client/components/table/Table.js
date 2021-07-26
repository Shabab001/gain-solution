import React, { useState } from "react";
import styles from "./Table.module.css";
import Modal from "../modal/Modal";
import { DELETE_STUDENT } from "../../apollo/mutations/student";
import { DELETE_SUBJECT } from "../../apollo/mutations/subject";
import { useMutation } from "@apollo/client";
import {
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import ConfirmModal from "../confirmModal/ConfirmModal";
const Table = ({ students, subjects }) => {
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [item, setItem] = useState(null);
  const [delType, setDelType] = useState("");
  const handleBtn = (id, item) => {
    setId(id);
    setItem(item);
    setModal(true);
  };
  const handleDel = () => {
    console.log("djhfjdfh");
    console.log(id);
    console.log(delType);
    if (delType && delType === "Subject" && id) {
      deleteSub({
        variables: {
          id: id,
        },
      });
      setModalOpen(false);
    } else if (delType && delType === "Student" && id) {
      deleteStudent({
        variables: {
          id: id,
        },
      });
      setModalOpen(false);
    }
  };

  ///////////////////////////////////////////// ----------------> Mutations

  const [deleteSub] = useMutation(DELETE_SUBJECT, {
    update(cache, data) {
      console.log(data);
      const cacheId = cache.identify(data.data.deleteSubject);
      cache.evict(cacheId);
    },
  });

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    update(cache, data) {
      console.log(data);
      const cacheId = cache.identify(data.data.deleteStudent);
      cache.evict(cacheId);
    },
  });

  //////////////////////////////////-------------------------->

  return (
    <table className={styles.table}>
      <thead>
        {subjects ? (
          <tr>
            <th className={styles.th}>Name</th>

            <th className={styles.th}>Students</th>
            <th className={styles.th}>Actions</th>
          </tr>
        ) : (
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Date Of Birth</th>
            <th className={styles.th}>Subjects</th>
            <th className={styles.th}>Actions</th>
          </tr>
        )}
      </thead>
      <tbody>
        {students &&
          students.map((student, index) => (
            <tr key={index}>
              <td className={styles.td}>{student.name}</td>
              <td className={styles.td}>{student.email}</td>
              <td className={styles.td}>{student.phone}</td>
              <td className={styles.td}>{student.dob}</td>
              <td className={styles.td}>
                {student.subject.map(item => `${item.name}, `)}
              </td>
              <td className={styles.td}>
                <Tooltip
                  title="Edit Student"
                  className={styles.actions1}
                  onClick={() => handleBtn(student.id, student)}
                >
                  <EditOutlined />
                </Tooltip>

                <Tooltip
                  title="Delete Student"
                  className={styles.actions}
                  onClick={() => {
                    setDelType("Student");
                    setId(student.id);

                    setModalOpen(true);
                  }}
                >
                  <DeleteOutlined />
                </Tooltip>
              </td>
            </tr>
          ))}
        {subjects &&
          subjects.map((sub, index) => (
            <tr key={index}>
              <td className={styles.td}>{sub.name}</td>

              <td className={styles.td}>
                {sub.student &&
                  sub.student.map((item, index) => {
                    if (
                      sub.student.length > 1 &&
                      index === sub.student.length - 1
                    ) {
                      return `${item.name}`;
                    } else if (sub.student.length === 1) {
                      return `${item.name}`;
                    } else {
                      return `${item.name}, `;
                    }
                  })}
              </td>
              <td className={styles.td}>
                <Tooltip
                  title="Edit Subject"
                  className={styles.actions1}
                  onClick={() => handleBtn(sub.id, sub)}
                >
                  <EditOutlined />
                </Tooltip>

                <Tooltip
                  title="Delete Subject"
                  className={styles.actions2}
                  onClick={() => {
                    setId(sub.id);
                    setDelType("Subject");
                    setModalOpen(true);
                  }}
                >
                  <DeleteOutlined />
                </Tooltip>
              </td>
            </tr>
          ))}
      </tbody>
      <Modal
        onClose={() => setModal(false)}
        show={modal}
        title={`Update ${subjects ? "Subject" : "Student"}`}
        type={`${subjects ? "Subject" : "Student"}`}
        method={"Update"}
        id={id}
        item={item}
      />

      {modalOpen && (
        <ConfirmModal
          onClose={() => setModalOpen(false)}
          acceptMethod={() => handleDel()}
          headerText="Delete item"
          bodyText="Are you sure you want to delete this item?"
        />
      )}
    </table>
  );
};

export default Table;
