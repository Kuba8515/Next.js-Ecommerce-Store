import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Shop.module.css';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// import { products } from '../../util/database';

export default function ShopPage(props) {
  //   const router = useRouter();

  //   const [cart, setCart] = useState(getParsedCookie('cart') || []);

  //   const userCookieObject = cart.find(
  //     (cookieObj) => cookieObj.id === props.product.id,
  //   );

  //   const initialItemCount = userCookieObject ? userCookieObject.itemCount : 1;

  //   const [itemCount, setItemCount] = useState(initialItemCount);

  //   // add to cart
  //   const addToCartHandler = () => {
  //     const currentCookie = getParsedCookie('cart') || [];

  //     const isItemInCart = currentCookie.some((cookieObject) => {
  //       return cookieObject.id === props.product.id; // id that comes from the URL
  //     });
  //     let newCookie;
  //     if (isItemInCart) {
  //       newCookie = currentCookie.filter(
  //         (cookieObject) => cookieObject.itemCount + 1,
  //       );
  //     } else {
  //       // add the new product
  //       newCookie = [...currentCookie, { id: props.product.id, itemCount }];
  //     }
  //     setParsedCookie('cart', newCookie);
  //     setCart(newCookie);
  //     router.push('/cart/');
  //   };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Results</h1>
      <div className={styles.cards}>
        {props.products.map((product) => {
          return (
            <div key={product.id}>
              <a href={`/products/${product.id}`}>
                {' '}
                <Image src={product.img} height={220} width={220} alt="" />
              </a>
              <h4 className={styles.title}>{product.name}</h4>
              <h5 className={styles.category}>Category: {product.category}</h5>
              <h4>
                Price: {product.price.amount} {product.price.currency}
              </h4>
              <button className={styles.button}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { products } = await import('../../util/database');

  const cookies = context.req.cookies.addItem || '[]';
  const addItem = JSON.parse(cookies);

  console.log(products);
  console.log(addItem);

  const addedProducts = products.map((product) => {
    return {
      ...product,
      addItem: addItem.some((id) => {
        return Number(product.id) === id;
      }),
    };
  });

  console.log(addedProducts);
  return {
    props: {
      products: addedProducts,
    },
  };
}
