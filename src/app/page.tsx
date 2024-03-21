import { SearchPanel } from '@/components/searchPanel/searchPanel';
import { SideFilters } from '@/components/sideFilters/sideFilters';
import { getProducts } from '@/helpers/api';
import { ProductList } from '@/components/mainPage/productList';
import dynamic from 'next/dynamic';

const QweryPanel = dynamic(() => import('@/components/qweryPanel/qweryPanel'), {
  ssr: false,
});

export default async function Home() {
  const productsFromServer = await getProducts();

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilters />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <QweryPanel />
            <ProductList productsFromServer={productsFromServer} />
          </div>
        </section>
      </div>
    </main>
  );
}
