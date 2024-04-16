import './products.scss';
import dynamic from 'next/dynamic';
import { SearchPanel } from '@/components/searchPanel/searchPanel';
import { getProducts } from '@/helpers/api';
import { ProductList } from '@/components/mainPage/productList';
import { Metadata } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorProductPage from './[nameSlug]/error';

const QweryPanel = dynamic(() => import('@/components/qweryPanel/qweryPanel'));
const SideFilters = dynamic(() => import('@/components/sideFilters/sideFilters'));

export const metadata: Metadata = {
  title: 'Online Store | Products',
  description: 'Buy Christmas decorations to create a festive atmosphere at your home',
};

export default async function Products() {
  const productsFromServer = await getProducts();

  return (
    <ErrorBoundary fallback={<ErrorProductPage />}>
      <main className="products-container wrapper">
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
    </ErrorBoundary>
  );
}
