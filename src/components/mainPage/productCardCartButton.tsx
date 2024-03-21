'use client';
import { useSelector } from 'react-redux';
import { getIsInCart } from '@/helpers/helpersFunc';
import { addProductToCart, removeAllProductsFromCart } from '@/store/controller';
import { CartItem, Product, RootReducerProps } from '@/types/types';

interface IProductCardCartButton {
  product: Product;
}

export default function ProductCardCartButton({ product }: IProductCardCartButton) {
  const { id } = product;
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);

  function productItemAddCart() {
    addProductToCart(product);
  }

  function productItemRemoveCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    removeAllProductsFromCart(dataset.id!);
  }

  const isInCart = getIsInCart(cartItemsState, id);

  const addToCart = (
    <div className="product-item__cart-add" data-id={id} onClick={productItemAddCart}>
      Add to cart
    </div>
  );

  const inCart = (
    <div className="product-item__cart-added" data-id={id} onClick={productItemRemoveCart}>
      In cart
    </div>
  );

  return isInCart ? inCart : addToCart;
}
