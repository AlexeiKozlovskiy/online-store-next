import './aboutPage.scss';
import type { Metadata } from 'next';
import { roboto, roboto_bold } from '@/styles/nextFonts';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Online Store | About project',
};

export default async function About() {
  return (
    <main className={roboto.className + ' aboutPage__container wrapper'}>
      <section className="aboutPage__section">
        <h2 className={roboto_bold.className + ' aboutPage__title'}>About project</h2>
        <p className="aboutPage__text">
          This fullstack project is an online store made using Next, Nest and PrismaDB. You can read a detailed description in the
          corresponding repositories of my Github.
        </p>
        <br />
        <p className="aboutPage__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-next">
            Next code.
          </a>{' '}
          For next configured ci/cd, you will see actions and PR comments and details.
        </p>
        <p className="aboutPage__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-nest">
            Nest code.
          </a>{' '}
          Nest servise utilize Prisma DB. I wrote this servise because I wanted to organize and experience full-fledged
          client-server interaction. I understand that the architecture of the whole app could have been made simpler.
        </p>
        <p className="aboutPage__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-react">
            React code.
          </a>{' '}
          Previously I developed this app in React, and then I moved to Next.
        </p>
        <p className="aboutPage__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/users/AlexeiKozlovskiy/projects/1/views/1">
            Task board.
          </a>{' '}
          I managed a common board task.
        </p>
        <br />
        <div className="aboutPage__wakatime">
          <Image
            alt="wakatime"
            width={162}
            height={18}
            src="https://wakatime.com/badge/user/018d3b7f-99dd-4b60-ab6b-4d807848fdb5/project/018de4e5-fbe2-4aaa-b92b-3fd594c0ee93.svg"
          />
          <p className="aboutPage__text-wakatime">- time on code a NextJS version.</p>
        </div>
        <br />
        <h3 className={roboto_bold.className + ' aboutPage__title'}>Please take note. </h3>
        <p className="aboutPage__text">
          Due to the use of a free deployment service for the backend, database, and the application itself, there may be delays
          in response and some bugs in first load. For example, a click on a product card, or the first request for a geting list
          of products or click by product category in the main page and side filters in product page. First fetching data is can
          take near 1-3 minutes, further is fast. You may need to reload the page.
        </p>
      </section>
    </main>
  );
}
