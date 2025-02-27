'use client';
import { FavoritesStar } from '@/components/favoritesStar/favoritesStar';
import Image from 'next/image';
import { useState } from 'react';

interface IProductImages {
  id: string;
  images: string[];
}

export function ProductImages({ id, images }: IProductImages) {
  const [curImage, setCurImage] = useState<number>(0);
  const [firstImg, secondImg] = images;

  function handelImageClick(numberImage: number) {
    setCurImage(numberImage);
  }

  return (
    <div className="product-page__img-container">
      <FavoritesStar id={id} add_style={'productPage-add'} added_style={'productPage-added'} />
      <div className="img-container__slider">
        <Image
          src={firstImg}
          className={`product-page-img-min ${!curImage && 'active-img'}`}
          alt="product-image-one"
          onClick={() => handelImageClick(0)}
          width={90}
          height={90}
          priority={false}
        />
        <Image
          src={secondImg}
          className={`product-page-img-min ${curImage && 'active-img'}`}
          alt="product-image-two"
          onClick={() => handelImageClick(1)}
          width={90}
          height={90}
          priority={false}
        />
      </div>
      <Image
        src={images && images[curImage]}
        className="product-page__img-main"
        alt="product-image-main"
        width={600}
        height={600}
        priority={false}
      />
    </div>
  );
}
