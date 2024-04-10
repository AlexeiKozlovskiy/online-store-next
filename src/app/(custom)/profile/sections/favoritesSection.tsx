'use client';
import '../profilePage.scss';
import { useMyFavoritesContext } from '@/context/favoritesContext';
import { ProductCard } from '@/components/mainPage/productCard';

export function FavoritesSection() {
  const { favoritesProducts } = useMyFavoritesContext();

  const emptyFavorites = (
    <div className="favorites__empty-wrapper">
      <h3 className="favorites__empty-catalog">You don&#39;t have favorites</h3>
    </div>
  );

  const favoritesList = (
    <>
      {favoritesProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <section className="my-shopping__section">
      <div className="favorites">{favoritesProducts.length ? favoritesList : emptyFavorites}</div>
    </section>
  );
}
