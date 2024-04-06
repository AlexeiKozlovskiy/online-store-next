import './mainPage.scss';
import Slider from './slider';
import { Metadata } from 'next';
import Snow from '@/components/snow/snow';
import { ruluko } from '@/styles/nextFonts';
import MainCategories from './mainCategories';
import { CATEGORIES_MAIN_PAGE } from '@/helpers/constant';

export const metadata: Metadata = {
  title: 'Online Store | Main',
  description: 'Buy Christmas decorations to create a festive atmosphere at your home',
};

export default function Home() {
  return (
    <main className="mainPage-container wrapper">
      <Snow />
      <div className="mainPage-container__slider">
        <Slider />
        {CATEGORIES_MAIN_PAGE.map((category) => (
          <div key={category.title} className="mainPage__categories">
            <p className={ruluko.className + ' mainPage__categories-title'}>{category.title} </p>
            <MainCategories
              pathRedirect={category.pathRedirect}
              image={category.image}
              altImage={category.altImage}
            ></MainCategories>
          </div>
        ))}
      </div>
    </main>
  );
}
