import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseOutlined } from "@ant-design/icons";

import { message, DatePicker, Select } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../../apollo/apolloClient";
import { CREATE_STUDENT, UPDATE_STUDENT } from "../../apollo/mutations/student";
import { UPDATE_SUBJECT, CREATE_SUBJECT } from "../../apollo/mutations/subject";
import { GET_SUBJECTS } from "../../apollo/queries/subject";
import moment from "moment";

const { Option } = Select;
const dateFormat = "YYYY/MM/DD";
const Modal = ({ show, onClose, title, type, method, id, item }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [subjectInputs, SetSubjectInputs] = useState({
    name: type === "Subject" && item ? item.name : "",
  });
  const [studentInputs, setStudentsInput] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    subject: [],
  });
  const { data } = useQuery(GET_SUBJECTS);
  console.log(id);

  // console.log(studentInputs);

  /// mutations ----------->

  const [updateSub] = useMutation(UPDATE_SUBJECT, {
    update(cache, { data }) {
      console.log(data);
      const cacheId = cache.identify(data.updateSubject);
      console.log(cacheId);
      cache.modify({
        fields: {
          getSubjects: (existingFieldData, { toReference }) => {
            // console.log(existingFieldData);
          },
        },
      });
      message.success("Subject has been Updated");
      onClose();
    },
  });
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    update(cache, { data }) {
      console.log(data);
      const cacheId = cache.identify(data.updateStudent);
      console.log(cacheId);
      cache.modify({
        fields: {
          getStudents: (existingFieldData, { toReference }) => {
            // console.log(existingFieldData);
          },
          getSubjects: (existingFieldData, { toReference }) => {
            // console.log(existingFieldData);
          },
        },
      });
      message.success("Subject has been Updated");
      onClose();
    },
  });

  const [createSubject] = useMutation(CREATE_SUBJECT, {
    update(cache, { data }) {
      console.log(data);
      const cacheId = cache.identify(data.createSubject);
      console.log(cacheId);
      cache.modify({
        fields: {
          getSubjects: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
      onClose();
      message.success("Subject has been added");
    },
  });
  const [createStudent] = useMutation(CREATE_STUDENT, {
    update(cache, { data }) {
      console.log(data);
      const cacheId = cache.identify(data.createStudent);
      console.log(cacheId);
      cache.modify({
        fields: {
          getStudents: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
      onClose();
      message.success("Subject has been added");
    },
  });

  //////////////////// ------------------------------->

  const handleChange = e => {
    SetSubjectInputs({
      ...subjectInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = e => {
    setStudentsInput({
      ...studentInputs,
      [e.target.name]: e.target.value,
    });
  };
  function onChange(date, dateString) {
    setStudentsInput({
      ...studentInputs,
      dob: dateString,
    });
  }
  const handleSelect = value => {
    console.log(value);
    setStudentsInput({
      ...studentInputs,
      subject: value,
    });
  };
  useEffect(() => {
    setIsBrowser(true);
    if (type === "Subject" && method === "Update" && item) {
      console.log(item);
      SetSubjectInputs({
        name: item.name,
      });
    } else if (type === "Student" && method === "Update" && item) {
      setStudentsInput({
        name: item.name,
        email: item.email,
        dob: item.dob,
        phone: item.phone,
        subject:
          item.subject && item.subject.length !== 0
            ? item.subject.map(item => item.id)
            : [],
      });
    }
  }, [item]);

  const addSubject = () => {
    if (method !== "Update") {
      createSubject({
        variables: { data: subjectInputs },
      });
    } else {
      updateSub({
        variables: { id: id, data: subjectInputs },
      });
      onClose();
    }
  };
  const addStudent = () => {
    if (method !== "Update") {
      createStudent({
        variables: {
          data: {
            name: studentInputs.name,
            email: studentInputs.email,
            phone: studentInputs.phone,
            dob: studentInputs.dob,
          },
        },
      });
    } else {
      updateStudent({
        variables: {
          id: id,
          Inputs: {
            name: studentInputs.name,
            email: studentInputs.email,
            phone: studentInputs.phone,
            dob: studentInputs.dob,
          },
          Subjects: studentInputs.subject,
        },
      });
    }
  };
  const modalContent = show ? (
    <div className={styles.main}>
      <div className={styles.borad}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <p>{title}</p>
          </div>
          <CloseOutlined onClick={onClose} />
        </div>
        {type === "Subject" ? (
          <div className={styles.form}>
            <div>
              <input
                placeholder="Name"
                name="name"
                value={subjectInputs.name}
                onChange={handleChange}
              />
            </div>
            <div onClick={addSubject} className={styles.modalBtn}>
              <p>Submit</p>
            </div>
          </div>
        ) : (
          <div className={styles.form2}>
            <div className={styles.secondsec}>
              <input
                placeholder="Name"
                name="name"
                onChange={handleChange2}
                value={studentInputs.name}
              />
              <DatePicker
                onChange={onChange}
                value={
                  studentInputs.dob ? moment(studentInputs.dob, dateFormat) : ""
                }
                style={{
                  width: "97%",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center !important",
                }}
              />
            </div>
            <div className={styles.firstsec}>
              <input
                placeholder="Email"
                name="email"
                onChange={handleChange2}
                value={studentInputs.email}
              />
              <input
                placeholder="phone"
                name="phone"
                onChange={handleChange2}
                value={studentInputs.phone}
              />
            </div>
            {method === "Update" ? (
              <div>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select subjects"
                  onChange={handleSelect}
                  value={studentInputs.subject}
                >
                  {data.getSubjects.map((item, index) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </div>
            ) : null}

            <div onClick={addStudent} className={styles.modalBtn}>
              <p>Submit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

// const StyledModalBody = styled.div`
//   padding-top: 10px;
// `;

// const StyledModalHeader = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-size: 25px;
// `;

// const StyledModal = styled.div`
//   background: white;
//   width: 500px;
//   height: 600px;
//   border-radius: 15px;
//   padding: 15px;
// `;
// const StyledModalOverlay = styled.div``;

export default Modal;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_SUBJECTS,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
