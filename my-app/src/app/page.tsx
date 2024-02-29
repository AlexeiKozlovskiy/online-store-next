import { ProductCard } from '@/components/ProductCard/ProductCard';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { Product } from '@/types/types';

async function getData(): Promise<Product[]> {
  const res = await fetch(`https://online-store-api-7fyt.onrender.com/products`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function ProductsList() {
  const data = await getData();

  return (
    <>
      <div className="main-catalog__products" data-testid="main-catalog">
        {data && data.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}

export default async function Home() {
  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilter />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <ProductsList />
          </div>
        </section>
      </div>
    </main>
  );
}
