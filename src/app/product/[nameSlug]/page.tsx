import './productPage.scss';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowBack } from '@/components/arrowBack/arrowBack';
import type { Metadata } from 'next';
import { Product } from '@/types/types';
import { getProductByID, getProductIDByName } from '@/helpers/api';
import { QuantityPiecesProduct } from '@/components/quantityPieces/quantityPiecesProduct';
import { formatPrice } from '@/helpers/helpersFunc';
import { ProductImages } from '@/components/productPage/productImages';
import { AddToCart } from '@/components/productPage/buttonAddToCart/addToCart';
import ButtonBuyNow from '@/components/productPage/buttonBuyNow';
import ShakeField from '@/components/productPage/shakeField';

const CartIsInCart = dynamic(() => import('@/components/cartPage/cartIsInCart'), {
  ssr: false,
});

type MetadataParams = {
  params: { nameSlug: string };
};

interface IProductPage {
  params: { nameSlug: string };
}

export default async function ProductPage({ params }: IProductPage) {
  const { nameSlug } = params;
  const productID = await getProductIDByName(nameSlug);
  const product = await getProductByID({ id: productID });
  const { id, name, price, collection, stock, color, size, category, images } = product as Product;

  const productName = (
    <h3 className="product-summary__description" data-testid="product-description">
      {name} | {color} | {size}cm | ${formatPrice(price)}
    </h3>
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
          <td className="table__info">
            <ShakeField stock={stock}>{stock}</ShakeField>
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
          {productName}
          <CartIsInCart id={id} />
        </div>
        <div className="product-page__cart-container">
          <QuantityPiecesProduct stock={stock} />
          <AddToCart product={product} />
        </div>
        <div className="product-page__specifications-container">
          <h4 className="product-page__specifications-title">Product specifications</h4>
          {specificationsTable}
          <ButtonBuyNow product={product} />
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: MetadataParams): Promise<Metadata> {
  const { nameSlug } = params;
  const productID = await getProductIDByName(nameSlug);
  const product = await getProductByID({ id: productID });
  const { name, images, category } = product as Product;

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
