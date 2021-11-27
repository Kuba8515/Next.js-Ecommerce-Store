import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Category.module.css';

export default function CategoryCard({ image, name }) {
  return (
    <div className={styles.card}>
      <Link href={`/category/${name}`} passHref>
        <div>
          <Image
            className={styles.image}
            src={image}
            height={300}
            width={300}
            alt=""
          />

          <div className={styles.info}>
            <h3>{name}</h3>
            <p></p>
          </div>
        </div>
      </Link>
    </div>
  );
}
