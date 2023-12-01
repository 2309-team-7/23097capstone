import "./components.css";

const Navs = () => {
  return (
    <div className={styles.navs}>
      <div className={styles.frame}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        <div className={styles.searchBox}>
          <img className={styles.icon} alt="" src="/-.svg" />
          <div className={styles.searchForAnythingContainer}>
            <span className={styles.search}>{`Search `}</span>
            <span className={styles.forAnything}>for anything</span>
          </div>
        </div>
      </div>
      <div className={styles.navLinks}>
        <div className={styles.home}>Home</div>
        <div className={styles.accountWrapper}>
          <div className={styles.home}>Account</div>
        </div>
        <div className={styles.home}>Login</div>
        <div className={styles.home}>Signup</div>
        <div className={styles.home}>Logout</div>
      </div>
    </div>
  );
};

export default Navs;