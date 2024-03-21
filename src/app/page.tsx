import { SearchPanel } from '@/components/searchPanel/searchPanel';
import { SideFilters } from '@/components/sideFilters/sideFilters';
import { ProductsList } from '@/components/mainPage/productList';

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
