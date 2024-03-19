import './ProductPage.scss';
import Link from 'next/link';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Product } from '@/types/types';
import { getData, getProductByID } from '@/helpers/api';
import { NameSkeleton } from '@/components/ProductPage/ProductSkeletons/NameSkeleton';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { formatPrice, replaceUnderscore } from '@/helpers/helpersFunc';
import { ProductImages } from '@/components/ProductPage/ProductImages/ProductImages';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { AddToCart } from '@/components/ProductPage/AddToCart/AddToCart';
import ButtonBuyNow from '@/components/ProductPage/ButtonBuyNow/ButtonBuyNow';
import type { Metadata, ResolvingMetadata } from 'next';

type MetadataParams = {
  params: { nameSlug: string };
};

export async function generateMetadata({ params }: MetadataParams, parent: ResolvingMetadata): Promise<Metadata> {
  const { nameSlug } = params;

  async function getProductID() {
    try {
      const products = await getData();
      const findProduct = products.find(({ name }) => name === replaceUnderscore(nameSlug));
      return findProduct?.id ?? '';
    } catch (error) {
      console.error('Error getting product ID:', error);
      return '';
    }
  }

  const previousImages = (await parent).openGraph?.images || [];

  const productID = await getProductID();
  const product = await getProductByID({ id: productID });
  const { name, images, category } = product as Product;

  return {
    metadataBase: new URL('https://online-store-next-rouge.vercel.app'),
    title: name,
    category: category,
    keywords: ['decorations', 'christmas', 'atmosphere'],
    description: 'Find Christmas decorations to create a festive atmosphere at your home',
    // openGraph: {
    //   title: name,
    //   images: [
    //     {
    //       url: images[0] || 'https://api.iconify.design/mdi:home.svg',
    //       width: 90,
    //       height: 90,
    //       alt: `image ${name}`,
    //     },
    //   ],
    // },

    openGraph: {
      images: [images[0], ...previousImages],
    },
  };
}

interface IProductPage {
  params: { nameSlug: string };
}

export default async function ProductPage({ params }: IProductPage) {
  const { nameSlug } = params;
  const isInCart = false;
  const isShake = false;
  const resetInput = false;
  const isFetching = false;

  async function getProductID() {
    const clikedId = getCookie('clikedId', { cookies });

    if (clikedId) {
      return clikedId;
    } else {
      try {
        const products = await getData();
        const findProduct = products.find(({ name }) => name === replaceUnderscore(nameSlug));
        return findProduct?.id ?? '';
      } catch (error) {
        console.error('Error getting product ID:', error);
        return '';
      }
    }
  }

  const productID = await getProductID();
  const product = await getProductByID({ id: productID });
  const { id, name, price, collection, stock, color, size, category, images } = product as Product;

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

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

  const specificationsTable = (
    <table className="product-page__table">
      <tbody>
        <tr className="table__row">
          <td className="table__title">Item number</td>
          <td className="table__info">{id?.slice(-5)}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Color</td>
          <td className="table__info">{color}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Collection</td>
          <td className="table__info">{collection}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Price</td>
          <td className="table__info">{price}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Size</td>
          <td className="table__info">{size}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Category</td>
          <td className="table__info">{category}</td>
        </tr>
        <tr className="table__row">
          <td className="table__title">In stock</td>
          <td className={`table__info ${isShake && 'shake-product'}`} data-testid="shake-product">
            {stock}
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <main>
      <div className="bread-crumbs-product__container">{breadCrumbs}</div>
      <section className="product-page wrapper">
        <ArrowBack />
        <ProductImages images={images} />
        <div className="product-page__summaru-item product-summary">
          {isFetching ? <NameSkeleton /> : productName}
          {isInCart && inCart}
        </div>
        <div className="product-page__cart-container">
          <QuantityPiecesProduct stock={stock} onResetInput={resetInput} />
          <AddToCart id={id} isInCart={isInCart} />
        </div>
        <div className="product-page__specifications-container">
          <h4 className="product-page__specifications-title">Product specifications</h4>
          {specificationsTable}
          <ButtonBuyNow isInCart={isInCart} />
        </div>
      </section>
    </main>
  );
}
