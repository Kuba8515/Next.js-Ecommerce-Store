import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.image}>
        <Image src="/favicon.png" alt="logo" width={60} height={60} />
        <h6 className={styles.logo}>Sports Shop</h6>
      </div>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/products">
            <a>Shop</a>
          </Link>
        </li>
        <li className={styles.navlink}>
          <Link href="../cart">
            <a>Cart</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
