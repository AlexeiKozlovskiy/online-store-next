import './contactsPage.scss';
import MapYandex from './mapYandex';
import { roboto, roboto_bold } from '@/styles/nextFonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Store | Contacts',
  description: 'Find Christmas decorations to create a festive atmosphere at your home',
};

export default async function Contacts() {
  return (
    <main className={roboto.className + ' contactsPage__container wrapper'}>
      <MapYandex />
      <div className="contactsPage-adress__container">
        <h2 className={roboto_bold.className + ' contactsPage-adress__header'}>Adress</h2>
        <p className="contactsPage-adress">
          Bayfront Park <br />
          Miami, USA 12345
        </p>
        <p className="contactsPage-adress">
          Operating hours: <br /> Mn - Fr: с 9:00 up to 17:00 <br /> Sat - Sun: day off
        </p>
        <p className="contactsPage-adress">
          Telephone <br /> +1 99 999-99-99
        </p>
      </div>
    </main>
  );
}
