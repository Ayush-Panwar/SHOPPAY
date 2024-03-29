import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

import { FaOpencart } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Main({ searchHandler }) {
  const { cart } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 1) {
      if (router.pathname !== "browse") {
        router.push(`/browse?search=${query}`);
      } else {
        searchHandler();
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="../../../logo.png" alt="" />
          </div>
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart">
          <div className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
