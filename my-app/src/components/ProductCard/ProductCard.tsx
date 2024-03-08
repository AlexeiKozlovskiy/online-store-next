'use client';
import { Product } from '@/types/types';
import './ProductCard.scss';
import Link from 'next/link';
import Image from 'next/image';

type ProductViewData = {
  product: Product;
};

export function ProductCard({ product }: ProductViewData) {
  const { id, images, name, price, color, collection, size, category, stock } = product;

  function productItemAddCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    console.log('productItemAddCart');
  }

  function productItemRemoveCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    console.log('productItemRemoveCart');
  }

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

  return (
    <div className="product-item">
      <Link data-testid="product-item-chose" href={`/${name}`}>
        <Image className="product-item__img" data-id={id} src={images[0]} alt="product image" width={250} height={250} />
      </Link>
      <div className="product-item__text-wrapper">{addToCart}</div>
      {/* <FavoritesStar id={id} add_style={'product-add'} added_style={'product-added'} /> */}
      <div className="product-item__info">
        <div className="item-info__name-price">
          <span className="item-info__name">{name}</span>
          <span className="item-info__price">${price}</span>
        </div>
        <div className="item-info__color">Color: {color}</div>
        <div className="item-info__colection">Colection: {collection}</div>
        <div className="item-info__size">Size: {size} cm</div>
        <div className="item-info__category">Category: {category}</div>
        <div className="item-info__in-stock">In stock: {stock}</div>
      </div>
    </div>
  );
}
