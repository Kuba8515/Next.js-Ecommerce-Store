import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { calcTotalCount, calcTotalSum } from '../util/calculator';

export default function Checkout(props) {
  const [cart, setCart] = useState(props.cartArray);
  const router = useRouter();
  const totalSum = calcTotalSum(cart);
  const totalCount = calcTotalCount(cart);
  return (
    <div>
      <Head>
        <title>Thank you for your trust</title>
      </Head>
      <div>
        <p>Summarizing your purchase:</p>
        <p>Total sum: {totalSum} €</p>
        <p>Quantity: {totalCount}</p>
      </div>
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
