import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.main}>
      <div>
        <div>
          <p>Gain Solution</p>
        </div>
        <div>
          <div>
            <p>Add Student</p>
          </div>
          <div>
            <p>Add Subject</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
