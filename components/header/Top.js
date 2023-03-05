import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/Ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div className=""></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt="" />
            <span>{country.name}/ INR</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {" "}
            {loggedIn ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img
                    src="https://i.pinimg.com/736x/f6/a6/ee/f6a6ee3f5c366950db6012a0d44cc882.jpg"
                    alt=""
                  />
                  <span>Ayush</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
