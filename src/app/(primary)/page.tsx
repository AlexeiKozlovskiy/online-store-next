import './mainPage.scss';
import Slider from './slider';
import Snow from '@/components/snow/snow';
import MainCategories from './mainCategories';
import { Metadata } from 'next';
import { CATEGORIS_MAIN_PAGE } from '@/helpers/constant';

export const metadata: Metadata = {
  title: 'Online Store | Home',
  description: 'Buy Christmas decorations to create a festive atmosphere at your home',
};

export default function Home() {
  return (
    <main className="mainPage-container wrapper">
      <Snow />
      <div className="mainPage-container__slider">
        <Slider />
        {CATEGORIS_MAIN_PAGE.map((category) => (
          <div key={category.title} className="mainPage__categories">
            <p className="mainPage__categories-title">{category.title} </p>
            <MainCategories
              pathRedirect={category.pathRedirect}
              srcImage={category.srcImage}
              altImage={category.altImage}
            ></MainCategories>
          </div>
        ))}
      </div>
    </main>
  );
}
