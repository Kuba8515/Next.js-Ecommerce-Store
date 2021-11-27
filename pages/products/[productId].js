import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/SingleProductPage.module.css';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

export default function Products(props) {
  const router = useRouter();

  const [cart, setCart] = useState(getParsedCookie('cart') || []);

  const userCookieObject = cart.find(
    (cookieObj) => cookieObj.id === props.singleProduct.id,
  );

  const initialItemCount = userCookieObject ? userCookieObject.itemCount : 1;

  const [itemCount, setItemCount] = useState(initialItemCount);

  // add to cart
  const addToCartHandler = () => {
    const currentCookie = getParsedCookie('cart') || [];

    const isItemInCart = currentCookie.some((cookieObject) => {
      return cookieObject.id === props.singleProduct.id; // id that comes from the URL
    });
    let newCookie;
    if (isItemInCart) {
      newCookie = currentCookie.filter(
        (cookieObject) => cookieObject.itemCount + 1,
      );
    } else {
      // add the new product
      newCookie = [...currentCookie, { id: props.singleProduct.id, itemCount }];
    }
    setParsedCookie('cart', newCookie);
    setCart(newCookie);
    router.push('/cart/');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Page</title>
      </Head>
      <div className={styles}>
        <Image
          src={props.singleProduct.img}
          height={300}
          width={300}
          alt={props.singleProduct.name}
        />
        <h4 className={styles.title}>{props.singleProduct.name}</h4>
        <h6 className={styles.category}>{props.singleProduct.category}</h6>
        <p>€ {props.singleProduct.price.amount}</p>
        <button className={styles.button} onClick={addToCartHandler}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { products } = await import('../../util/database');

  const idFromUrl = context.query.productId;
  const singleProduct = products.find((product) => {
    return idFromUrl === product.id;
  });

  return {
    props: {
      singleProduct,
    },
  };
}
