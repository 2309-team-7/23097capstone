import boozeBuddyLogo from "../assets/BoozeBuddyLogo.png";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthButton } from "./AuthButton";

export default function NavBar({ token, setToken }) {
  return (
    <nav className={styles.nav}>
      <img id="logo-image" src={boozeBuddyLogo} />
      <ul className={styles.ul}>
        <button>
          <li className={styles.li}>
            <Link to="/">Home</Link>
          </li>
        </button>
        <button>
          <AuthButton token={token} setToken={setToken} />
        </button>
        <button>
          <li className={styles.li}>
            <Link to="/my-account">My Account</Link>
          </li>
        </button>
        <button>
          <li className={styles.li}>
            <Link to="/addliquor">AddLiquor</Link>
          </li>
        </button>
      </ul>
    </nav>
  );
}
