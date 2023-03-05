import Link from "next/link";
import styles from "./styles.module.scss";

export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay !</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://i.pinimg.com/736x/f6/a6/ee/f6a6ee3f5c366950db6012a0d44cc882.jpg"
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>Ayush</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}
      <ul>
        <li className={styles.li}>
          <Link href="/profile">Account</Link>
        </li>
        <li className={styles.li}>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li className={styles.li}>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li className={styles.li}>
          <Link href="/profile/address">Address</Link>
        </li>
        <li className={styles.li}>
          <Link href="/profile/whishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
