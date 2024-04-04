import './newsPage.scss';
import type { Metadata } from 'next';
import NewsItem from './newsItem';
import { NEWS } from '@/helpers/constant';
import { ruluko } from '@/styles/nextFonts';

export const metadata: Metadata = {
  title: 'Online Store | News',
  description: 'Online Store news, promotion for the purchase of goods',
};

export default async function News() {
  return (
    <main className={ruluko.className + ' newsPage__container wrapper'}>
      {NEWS.map((item) => (
        <NewsItem key={item.title} date={item.date} title={item.title} image={item.image} />
      ))}
    </main>
  );
}
