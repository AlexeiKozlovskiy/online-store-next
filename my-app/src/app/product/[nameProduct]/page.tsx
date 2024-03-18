'use client';
import './ProductPage.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Product } from '@/types/types';
import { ImgsSkeleton } from '@/components/ProductSkeletons/ImgsSkeleton';
import { getData, getProductByID } from '@/helpers/api';
// import { getCookie } from 'cookies-next';
import { BreadCrumbSkeleton } from '@/components/ProductSkeletons/BreadCrumbSkeleton';
import { NameSkeleton } from '@/components/ProductSkeletons/NameSkeleton';
import { SpecSkeleton } from '@/components/ProductSkeletons/SpecSkeleton';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { formatPrice, replaceUnderscore } from '@/helpers/helpersFunc';
import { ProductImages } from '@/components/ProductImages/ProductImages';

export default function ProductPage({ params }: { params: { nameProduct: string } }) {
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    collection: 0,
    stock: 0,
    color: '',
    size: 0,
    category: '',
    images: [],
  });
  const [isFetching, setIsFetching] = useState(true);
  const [productID, setProductID] = useState('');
  const { nameProduct } = params;
  // const clikedId = getCookie('clikedId');

  // const idProduct = getIDProductFromURL(pathname);
  const isShake = false;
  const resetInput = false;

  useEffect(() => {
    async function getProductId() {
      const data = await getData();
      const findProduct = data.find(({ name }) => {
        const finedName = replaceUnderscore(nameProduct);
        return name === finedName;
      });

      if (findProduct) {
        setProductID(findProduct.id);
      }
    }
    getProductId();
  }, [nameProduct]);

  useEffect(() => {
    async function getProducts() {
      if (productID) {
        setIsFetching(true);
        const product = await getProductByID({ id: productID });
        setIsFetching(false);
        if (product) {
          setProduct(product);
        }
      }
    }
    getProducts();
  }, [productID]);

  const { id, name, price, collection, stock, color, size, category, images } = product as Product;

  function handelAddClick() {
    console.log('add click');
  }

  function handelBuyNowBtn() {
    console.log('buy now click');
  }

  function handelChangeQty(value: string) {
    setQuantity(value);
  }

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

  const addToCart = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id} data-testid="button-add-cart">
      ADD TO CART
    </button>
  );

  const addMore = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id}>
      ADD MORE
    </button>
  );

  const productName = (
    <>
      <h3 className="product-summary__description" data-testid="product-description">
        {name} | {color} | {size}cm | ${formatPrice(price)}
      </h3>
    </>
  );

  const breadCrumbs = (
    <div className="bread-crumbs-product">
      <div className="bread-crumbs-product__path">
        <Link href="/" className="bread-crumbs-product__home-link">
          Home
        </Link>
      </div>
      <div className="bread-crumbs-product__path">{category}</div>
      <div className="bread-crumbs-product__path">{name}</div>
    </div>
  );

  return (
    <main>
      <div className="bread-crumbs-product__container">{isFetching ? <BreadCrumbSkeleton /> : breadCrumbs}</div>
      <section className="product-page wrapper">
        <ArrowBack />
        {isFetching ? <ImgsSkeleton /> : <ProductImages images={images} />}
        <div className="product-page__summaru-item product-summary">
          {isFetching ? <NameSkeleton /> : productName}
          {isInCart && inCart}
        </div>
        <div className="product-page__cart-container">
          <QuantityPiecesProduct stock={stock} onChangeQuantity={handelChangeQty} onResetInput={resetInput} />
          {isInCart ? addMore : addToCart}
        </div>
        <div className="product-page__specifications-container">
          <h4 className="product-page__specifications-title">Product specifications</h4>
          <table className="product-page__table">
            <tbody>
              <tr className="table__row">
                <td className="table__title">Item number</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={80} /> : id?.slice(-5)}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Color</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={60} /> : color}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Collection</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={100} /> : collection}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Price</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={100} /> : price}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Size</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={40} /> : size}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Category</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={160} /> : category}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">In stock</td>
                <td className={`table__info ${isShake && 'shake-product'}`} data-testid="shake-product">
                  {isFetching ? <SpecSkeleton width={40} /> : stock}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="button-buy-now button" data-id={isInCart} onClick={handelBuyNowBtn} data-testid="button-buy-now">
            BUY NOW
          </button>
        </div>
      </section>
    </main>
  );
}
