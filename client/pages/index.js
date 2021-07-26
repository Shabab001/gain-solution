import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/apolloClient";
import { GET_STUDENTS } from "../apollo/queries/student";
import { GET_SUBJECTS } from "../apollo/queries/subject";
import AddBtn from "../components/addBtn/AddBtn";
import Table from "../components/table/Table";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, loading } = useQuery(GET_STUDENTS);
  const { data: data2 } = useQuery(GET_SUBJECTS);

  if (data2) {
    console.log(data2);
  }

  return (
    <div className={styles.main}>
      <div className={styles.upper}>
        <div className={styles.heading}>
          <p>Students</p>
        </div>
        <AddBtn text={"Student"} />
      </div>
      <div className={styles.tableContainer}>
        <Table students={data.getStudents} />
      </div>
      <div className={styles.upper}>
        <div className={styles.heading}>
          <p>Subjects</p>
        </div>
        <AddBtn text={"Subject"} subjects={data2.getSubjects} />
      </div>
      <div className={styles.tableContainer}>
        <Table subjects={data2.getSubjects} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_STUDENTS,
  });
  await apolloClient.query({
    query: GET_SUBJECTS,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
