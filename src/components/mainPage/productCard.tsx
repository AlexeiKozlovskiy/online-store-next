'use client';
import './productCard.scss';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Product, ROUTE } from '@/types/types';
import { replaceSpace } from '@/helpers/helpersFunc';
import { roboto } from '@/styles/nextFonts';
import { FavoritesStar } from '@/components/favoritesStar/favoritesStar';

const CardButton = dynamic(() => import('./productCardCartButton'));

type ProductViewData = {
  product: Product;
};

export function ProductCard({ product }: ProductViewData) {
  const { id, images, name, price, color, collection, size, category, stock } = product;
  const router = useRouter();

  function productItemClick() {
    setCookie('clikedId', `${id}`);
    router.push(`${ROUTE.PRODUCTS}/${replaceSpace(name)}`, { scroll: false });
  }

  return (
    <div className={roboto.className + ' product-item'}>
      <div data-testid="product-item-chose">
        <Image
          className="product-item__img"
          data-id={id}
          src={images[0]}
          alt="product image"
          width={250}
          height={250}
          onClick={productItemClick}
        />
      </div>
      <div className="product-item__text-wrapper">{<CardButton product={product} />}</div>
      <FavoritesStar id={id} add_style={'product-add'} added_style={'product-added'} />
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
