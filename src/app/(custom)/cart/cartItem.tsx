'use client';
import './cartPage.scss';
import Image from 'next/image';
import { CartItem, ROUTE } from '@/types/types';
import { useAnimations } from '@/hooks/animationsHook';
import { removeAllProductsFromCart } from '@/store/controller';
import { formatPrice, replaceSpace } from '@/helpers/helpersFunc';
import { ButtonCross } from '@/components/buttonCross/buttonCross';
import { QuantityPiecesCart } from '@/components/quantityPieces/quantityPiecesCart';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function CartItemList({ itemNumber, quantity, product }: CartItem) {
  const { id, images, name, price, color, collection, size, category, stock } = product;
  const isShake = useAnimations({ quantity, stock });
  const router = useRouter();

  function handelCrossClick(id: string) {
    removeAllProductsFromCart(id);
  }
  const itemPrice = formatPrice(price * quantity);

  function handleImageClick() {
    setCookie('clikedId', `${id}`);
    router.push(`${ROUTE.PRODUCT}/${replaceSpace(name)}`);
  }

  return (
    <tr className="cart-table__cart-item">
      <th className="cart-item__number">
        <span className="number-round">{itemNumber}</span>
      </th>
      <th className="cart-item__img-container">
        <Image
          onClick={handleImageClick}
          className="cart-item__img"
          data-id={id}
          src={images[0]}
          alt="product image"
          width={160}
          height={160}
          priority={true}
        />
      </th>
      <th className="cart-item__info">
        {/* <FavoritesStar id={id} add_style={'cart-favorites-add'} added_style={'cart-favorites-added'} /> */}
        <h4 className="cart-item-info__name">{name}</h4>
        <ul className="cart-item-info__list">
          <li className="cart-item-info__color">Color: {color}</li>
          <li className="cart-item-info__collecrion">Collection: {collection}</li>
          <li className="cart-item-info__size">Size: {size}cm</li>
          <li className="cart-item-info__category">Category: {category}</li>
          <li className={`cart-item-info__instock ${isShake && 'shake-cart'}`} data-id={id}>
            In stock: {stock}
          </li>
        </ul>
      </th>
      <th className="cart-item__price">${price}</th>
      <th className="cart-item__quantity">
        {<QuantityPiecesCart id={id} quantity={quantity} stock={stock} product={product} />}
      </th>
      <th className="cart-item__subtotal">
        ${itemPrice}
        <ButtonCross onClickCross={() => handelCrossClick(id)} adittionClassName="cart-item-cross" />
      </th>
    </tr>
  );
}
