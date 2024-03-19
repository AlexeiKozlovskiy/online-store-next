'use client';

interface IAddToCart {
  id: string;
  isInCart: boolean;
  //   onAddToCart: () => void;
  //   onBuyNowBtn: () => void;
}

export function AddToCart({ id, isInCart }: IAddToCart) {
  function handelAddClick() {
    console.log('add click');
  }

  function handelBuyNowBtn() {
    console.log('buy now click');
  }

  const addToCart = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id} data-testid="button-add-cart">
      ADD TO CART
    </button>
  );

  const addMore = (
    <button className="button-add-cart button" onClick={handelBuyNowBtn} data-id={id}>
      ADD MORE
    </button>
  );

  return <>{isInCart ? addMore : addToCart}</>;
}
