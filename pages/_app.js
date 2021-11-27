import '../styles/globals.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getParsedCookie } from '../util/cookies';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getParsedCookie('cart'));
  }, []);

  return (
    <div className="wrapper">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon-apple-touch.png"
        />
        <link rel="icon" href="/favicon.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <Header />
      <Component shoppingCart={cart} setShoppingCart={setCart} {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
