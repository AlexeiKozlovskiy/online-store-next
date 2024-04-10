import './productPage.scss';
import Link from 'next/link';
import Loading from './loading';
import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ShakeField from './shakeField';
import { ROUTE } from '@/types/types';
import ErrorProductPage from './error';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import ButtonBuyNow from './buttonBuyNow';
import GenerateTitle from './generateTitle';
import { ProductImages } from './productImages';
import { ErrorBoundary } from 'react-error-boundary';
import { AddToCart } from './buttonAddToCart/addToCart';
import { roboto, roboto_bold } from '@/styles/nextFonts';
import { getProducts, getProductByID } from '@/helpers/api';
import { ArrowBack } from '@/components/arrowBack/arrowBack';
import getMetadataWithFallback from './getMetadataWithFallback';
import { formatPrice, replaceUnderscore } from '@/helpers/helpersFunc';
import { QuantityPiecesProduct } from '@/components/quantityPieces/quantityPiecesProduct';

const IsInCart = dynamic(() => import('./IsInCart'), {
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
  const product = await getProductByID(productID);

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
    <div className={roboto.className + ' bread-crumbs-product'}>
      <div className="bread-crumbs-product__path">
        <Link href={ROUTE.MAIN} className="bread-crumbs-product__home-link">
          Home
        </Link>
      </div>
      <div className="bread-crumbs-product__path">
        <Link href={ROUTE.PRODUCTS} className="bread-crumbs-product__home-link">
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
          <td className={roboto_bold.className + ' table__title'}>Item number</td>
          <td className="table__info">{id?.slice(-5)}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>Color</td>
          <td className="table__info">{color}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>Collection</td>
          <td className="table__info">{collection}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>Price</td>
          <td className="table__info">{price}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>Size</td>
          <td className="table__info">{size}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>Category</td>
          <td className="table__info">{category}</td>
        </tr>
        <tr className="table__row">
          <td className={roboto_bold.className + ' table__title'}>In stock</td>
          <td className="table__info">
            <ShakeField stock={stock}>{stock}</ShakeField>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <ErrorBoundary fallback={<ErrorProductPage />}>
      <Suspense fallback={<Loading />}>
        <main>
          <GenerateTitle title={name} />
          <div className="bread-crumbs-product__container">{breadCrumbs}</div>
          <section className={roboto.className + ' product-page wrapper'}>
            <ArrowBack />
            <ProductImages id={id} images={images} />
            <div className="product-page__summaru-item product-summary">{productName}</div>
            <div className="product-page__cart-container">
              <div className="product-page__isInCart-container">{<IsInCart id={id} />}</div>
              <div className="product-page__add-to-cart-container">
                <QuantityPiecesProduct stock={stock} />
                <AddToCart product={product} />
              </div>
            </div>
            <div className="product-page__specifications-container">
              <h4 className={roboto_bold.className + ' product-page__specifications-title'}>Product specifications</h4>
              {specificationsTable}
              <ButtonBuyNow product={product} />
            </div>
          </section>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export const generateMetadata = getMetadataWithFallback(async ({ params }: MetadataParams): Promise<Metadata> => {
  const { nameSlug } = params;
  const productID = await getProductIDByName(nameSlug);
  const product = await getProductByID(productID);

  if (!product) {
    throw new Error('Error Product metadata');
  }
  const { name, images, category } = product;

  return {
    metadataBase: new URL('https://online-store-next-rouge.vercel.app'),
    title: name,
    category,
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
});
