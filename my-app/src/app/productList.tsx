import { getData } from './api';
import { ProductCard } from '@/components/ProductCard/ProductCard';

export async function ProductsList() {
  const data = await getData();

  const noItemsFound = (
    <section className="empty-catalog" data-testid="empty-catalog">
      No items found
    </section>
  );

  return (
    <div className="main-catalog__products" data-testid="main-catalog">
      {data.length ? data.map((product) => <ProductCard key={product.id} product={product} />) : noItemsFound}
    </div>
  );
}
