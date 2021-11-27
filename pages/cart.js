import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Cart.module.css';
import { calcTotalCount, calcTotalSum } from '../util/calculator';
import {
  addItemById,
  getParsedCookie,
  setParsedCookie,
  subtractItemById,
} from '../util/cookies';

export default function Cart(props) {
  const [cart, setCart] = useState(props.cartArray);

  const router = useRouter();

  const totalSum = calcTotalSum(cart);
  const totalCount = calcTotalCount(cart);

  const checkoutButton = () => {
    router.push('/checkout/');
  };

  const clearButton = () => {
    setParsedCookie('cart', []);
    setCart([]);
  };

  const onClickDeleteButton = (id) => {
    const cookieValue = [...props.cookieArray];
    const newCookieValue = cookieValue.filter((p) => p.id !== id);
    setParsedCookie('cart', newCookieValue);
    setCart(newCookieValue);
  };
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Value</div>
          </div>
          {cart.map((product) => (
            <div key={`product-li-${product.id}`} className={styles.body}>
              <div className={styles.image}>
                <Image
                  src={product.image}
                  height="100"
                  width="100"
                  alt={product.name}
                />
              </div>
              <p>{product.name}</p>
              <p>€ {product.price}</p>
              <p>{product.itemCount}</p>
              <div className={styles.buttons}>
                <button onClick={() => setCart(addItemById(product.id))}>
                  +
                </button>
                <button
                  onClick={() => {
                    const subtractedValue = subtractItemById(product.id);
                    setCart(subtractedValue);
                  }}
                >
                  -
                </button>
                <button onClick={() => onClickDeleteButton(product.id)}>
                  x
                </button>
              </div>
              <p>€ {product.itemCount * product.price}</p>
            </div>
          ))}
          <h2>Total price: € {totalSum}</h2>
          <h3>Total Items: {totalCount}</h3>
          <p>
            <button onClick={checkoutButton}>Go to Checkout</button>
          </p>
          <p>
            <button onClick={clearButton}>Clear cart</button>
          </p>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { products } = await import('../util/database');

  const rawCookie = context.req.cookies.cart;
  console.log(rawCookie);

  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  const cartArray = cookieArray.map((p) => {
    const cartObject = products.find((product) => product.id === p.id);

    return {
      id: cartObject.id,
      name: cartObject.name,
      price: cartObject.price.amount,
      image: cartObject.img,
      itemCount: p.itemCount,
    };
  });

  return {
    props: { products, cartArray, cookieArray },
  };
}
