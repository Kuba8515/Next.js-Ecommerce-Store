export function calcTotalSum(cartArray) {
  return cartArray
    .reduce((accumulator, product) => {
      return accumulator + product.price * product.itemCount;
    }, 0)
    .toFixed(2);
}

export function calcTotalCount(cartArray) {
  return cartArray
    .map((product) => product.itemCount)
    .reduce((total, currentCount) => total + currentCount, 0);
}
