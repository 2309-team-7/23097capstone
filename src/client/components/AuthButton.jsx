import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export function AuthButton({ token, setToken }) {
  if (!token) {
    return (
      <li className={styles.li}>
        <Link to="/login">Login</Link>
      </li>
    );
  }

  return (
    <li className={styles.li} onClick={() => setToken(null)}>
      <a href="#">Log out</a>
    </li>
  );
}
