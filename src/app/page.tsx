import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilters } from '@/components/SideFilters/SideFilters';
import { ProductsList } from '@/components/ProductList/productList';

export default async function Home() {
  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilters />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <ProductsList />
          </div>
        </section>
      </div>
    </main>
  );
}
