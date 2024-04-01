import './productPage.scss';
import Link from 'next/link';
// import Loading from './loading';
// import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { getProducts, getProductByID } from '@/helpers/api';
import { ArrowBack } from '@/components/arrowBack/arrowBack';
import ShakeField from './shakeField';
import ButtonBuyNow from './buttonBuyNow';
import { formatPrice, replaceUnderscore } from '@/helpers/helpersFunc';
import { ProductImages } from './productImages';
import { AddToCart } from './buttonAddToCart/addToCart';
import { QuantityPiecesProduct } from '@/components/quantityPieces/quantityPiecesProduct';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorProductPage from './error';
import { ROUTE } from '@/types/types';

const IsInCart = dynamic(() => import('@/app/(primary)/products/[nameSlug]/IsInCart'), {
  ssr: false,
});

type MetadataParams = {
  params: { nameSlug: string };
};

interface IProductPage {
  params: { nameSlug: string };
}

async function getProductIDByName(nameSlug: string): Promise<string> {
  const clikedId = getCookie('clikedId', { cookies });
  if (clikedId) return clikedId;
  const products = await getProducts();
  const findProduct = products.find(({ name }) => name === replaceUnderscore(nameSlug));
  return findProduct?.id ?? '';
}

export default async function ProductPage({ params }: IProductPage) {
  const { nameSlug } = params;
  const productID = await getProductIDByName(nameSlug);
  const product = await getProductByID({ id: productID });

  if (!product) {
    throw new Error('Error Product');
  }

  const { id, name, price, collection, stock, color, size, category, images } = product;

  if (!id || !images.length || !category) {
    throw new Error('Error properties product');
  }

  const productName = (
    <h3 className="product-summary__description" data-testid="product-description">
      {name} | {color} | {size}cm | ${formatPrice(price)}
    </h3>
  );

  const breadCrumbs = (
    <div className="bread-crumbs-product">
      <div className="bread-crumbs-product__path">
        <Link href={ROUTE.MAIN} className="bread-crumbs-product__home-link">
          Home
        </Link>
      </div>
      <div className="bread-crumbs-product__path">
        <Link href={ROUTE.PRODUCT} className="bread-crumbs-product__home-link">
          Products
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
          <td className="table__info">
            <ShakeField stock={stock}>{stock}</ShakeField>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <ErrorBoundary fallback={<ErrorProductPage />}>
      {/* <Suspense fallback={<Loading />}> */}
      <main>
        <div className="bread-crumbs-product__container">{breadCrumbs}</div>
        <section className="product-page wrapper">
          <ArrowBack />
          <ProductImages images={images} />
          <div className="product-page__summaru-item product-summary">{productName}</div>
          <div className="product-page__cart-container">
            <div className="product-page__isInCart-container">
              <IsInCart id={id} />
            </div>
            <div className="product-page__add-to-cart-container">
              <QuantityPiecesProduct stock={stock} />
              <AddToCart product={product} />
            </div>
          </div>
          <div className="product-page__specifications-container">
            <h4 className="product-page__specifications-title">Product specifications</h4>
            {specificationsTable}
            <ButtonBuyNow product={product} />
          </div>
        </section>
      </main>
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: MetadataParams): Promise<Metadata> {
  const { nameSlug } = params;
  const productID = await getProductIDByName(nameSlug);
  const product = await getProductByID({ id: productID });

  if (!product) {
    throw new Error('Error Product metadata');
  }

  const { name, images, category } = product;

  if (!name || !images.length || !category) {
    throw new Error('Error properties metadata');
  }

  return {
    metadataBase: new URL('https://online-store-next-rouge.vercel.app'),
    title: name,
    category: category,
    keywords: ['decorations', 'christmas', 'atmosphere'],
    description: 'Find Christmas decorations to create a festive atmosphere at your home',
    openGraph: {
      images: [
        {
          url: images[0],
          width: 100,
          height: 100,
          alt: `image ${name}`,
        },
      ],
    },
  };
}
