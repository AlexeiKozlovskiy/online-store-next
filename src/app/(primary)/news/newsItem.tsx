'use client';
import Image from 'next/image';
import './newsPage.scss';
import { useRouter } from 'next/navigation';
import { INews, ROUTE } from '@/types/types';
import { replaceSpace } from '@/helpers/helpersFunc';

export default function NewsItem({ date, title, image }: INews) {
  const router = useRouter();

  function handelNewsItemClick() {
    router.push(`${ROUTE.NEWS}/${replaceSpace(title)}`);
  }

  return (
    <div className="newsPage__items" onClick={handelNewsItemClick}>
      <Image className="newsPage-items__image" src={image} alt={title} width={266} height={208}></Image>
      <p className="newsPage-items__date">{date}</p>
      <p className="newsPage-items__title">{title}</p>
    </div>
  );
}
