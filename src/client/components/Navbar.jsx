import { Fragment } from "react";
import { Link } from "react-router-dom";
import boozeBuddyLogo from "../assets/BoozeBuddyLogo.png";
import { AuthButton } from "./AuthButton";
import styles from "./Navbar.module.css";

export default function NavBar({ token, setToken, user, setUser }) {
  return (
    <nav className={styles.nav}>
      <img className={styles.logoImage} src={boozeBuddyLogo} />
      <ul className={styles.ul}>
        <button>
          <li className={styles.li}>
            <Link to="/">Home</Link>
          </li>
        </button>
        <button>
          <AuthButton token={token} setToken={setToken} setUser={setUser} />
        </button>
        <button>
          <li className={styles.li}>
            <Link to="/my-account">My Account</Link>
          </li>
        </button>
        {user?.is_admin ? (
          <Fragment>
            <button>
              <li className={styles.li}>
                <Link to="/addliquor">AddLiquor</Link>
              </li>
            </button>
            <button>
              <li className={styles.li}>
                <Link to="/users">Users</Link>
              </li>
            </button>
          </Fragment>
        ) : null}
      </ul>
    </nav>
  );
}
