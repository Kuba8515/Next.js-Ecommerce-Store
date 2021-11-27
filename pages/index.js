import Head from 'next/head';
import CategoryCard from '../components/CategoryCard';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <Head>
        <title>Kuba - Sports Equipment</title>
      </Head>
      <strong className={styles.heading}>
        Welcome to my Sports Store. Please choose your category. Otherwise feel
        free to check out the Shop with brand new stuff !
      </strong>
      <div className={styles.small}>
        <CategoryCard image="/images/teamsports.jpg" name="teamsports" />
        <CategoryCard image="/images/extremesports.jpg" name="outdoor" />
        <CategoryCard image="/images/combat_sports.jpg" name="combatSports" />
        <CategoryCard image="/images/clothing.png" name="gym" />
        <CategoryCard
          image="/images/sports_accessiore.jpg"
          name="accessories"
        />
      </div>
    </main>
  );
}
