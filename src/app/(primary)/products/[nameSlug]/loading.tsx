import { ArrowBack } from '@/components/arrowBack/arrowBack';
import ButtonAddToCart from './buttonAddToCart/buttonAddToCart';
import { BreadCrumbSkeleton } from './productSkeletons/breadCrumbSkeleton';
import { ImgsSkeleton } from './productSkeletons/imgsSkeleton';
import { NameSkeleton } from './productSkeletons/nameSkeleton';
import { SpecSkeleton } from './productSkeletons/specSkeleton';
import { QuantityPiecesProduct } from '@/components/quantityPieces/quantityPiecesProduct';

export default function Loading() {
  const specificationsTable = (
    <table className="product-page__table">
      <tbody>
        <tr className="table__row">
          <td className="table__title">Item number</td>
          <td className="table__info">
            <SpecSkeleton width={80} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Color</td>
          <td className="table__info">
            <SpecSkeleton width={60} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Collection</td>
          <td className="table__info">
            <SpecSkeleton width={100} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Price</td>
          <td className="table__info">
            <SpecSkeleton width={100} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Size</td>
          <td className="table__info">
            <SpecSkeleton width={40} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">Category</td>
          <td className="table__info">
            <SpecSkeleton width={160} />
          </td>
        </tr>
        <tr className="table__row">
          <td className="table__title">In stock</td>
          <td className="table__info">
            <SpecSkeleton width={40} />
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <main>
      <div className="bread-crumbs-product__container">{<BreadCrumbSkeleton />}</div>
      <section className="product-page wrapper">
        <ArrowBack />
        <ImgsSkeleton />
        <div className="product-page__summaru-item product-summary">
          <NameSkeleton />
        </div>
        <div className="product-page__cart-container">
          <div className="product-page__isInCart-container">{/* <IsInCart id={id} /> */}</div>
          <div className="product-page__add-to-cart-container">
            <QuantityPiecesProduct stock={1} />
            <button className="button-add-cart button">
              <ButtonAddToCart />
            </button>
          </div>
        </div>
        <div className="product-page__specifications-container">
          <h4 className="product-page__specifications-title">Product specifications</h4>
          {specificationsTable}
          <button className="button-buy-now button">BUY NOW</button>
        </div>
      </section>
    </main>
  );
}
