import './newsItemPage.scss';
import type { Metadata } from 'next';
import { NEWS } from '@/helpers/constant';
import { INews } from '@/types/types';
import ImageNews from './imageNews';
import { roboto } from '@/styles/nextFonts';
import { replaceUnderscore } from '@/helpers/helpersFunc';
import { ArrowBack } from '@/components/arrowBack/arrowBack';

interface Ipage {
  params: {
    nameNews: string;
  };
}

export const metadata: Metadata = {
  title: 'Online Store | News',
  description: 'Online Store news, promotion for the purchase of goods',
};

export default function Page({ params: { nameNews } }: Ipage) {
  function getNews(nameNews: string) {
    return NEWS.find(({ title }) => title.toLocaleLowerCase() === replaceUnderscore(nameNews));
  }

  const { date, title, image, description } = getNews(nameNews) as INews;

  return (
    <main className={roboto.className + ' newsItemPage__container wrapper'}>
      <ArrowBack />
      <section className="newsItemPage__content">
        <p className="newsItemPage__date">{date}</p>
        <h2 className="newsItemPage__title">{title}</h2>
        <ImageNews image={image} title={title} />
        <p className="newsItemPage__description">{description}</p>
      </section>
    </main>
  );
}
