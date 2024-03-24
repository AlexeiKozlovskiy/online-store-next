import dynamic from 'next/dynamic';
import { SearchPanel } from '@/components/searchPanel/searchPanel';
import { getProducts } from '@/helpers/api';
import { ProductList } from '@/components/mainPage/productList';

const QweryPanel = dynamic(() => import('@/components/qweryPanel/qweryPanel'));
const SideFilters = dynamic(() => import('@/components/sideFilters/sideFilters'));

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
