'use client';

interface IBuyNow {
  isInCart: boolean;
}

export default function ButtonBuyNow({ isInCart }: IBuyNow) {
  function handelBuyNowBtn() {
    console.log('buy now click');
  }

  return (
    <button className="button-buy-now button" data-id={isInCart} onClick={handelBuyNowBtn} data-testid="button-buy-now">
      BUY NOW
    </button>
  );
}
