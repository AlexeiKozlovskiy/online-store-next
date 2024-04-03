'use client';
import { useMediaMatches } from '@/hooks/mediaMatchesHook';
import Image from 'next/image';

interface IimageNews {
  image: string;
  title: string;
}

export default function ImageNews({ image, title }: IimageNews) {
  const { width, height } = useMediaMatches({
    mediaPoints: [
      { maxWidth: 420, width: 300, height: 170 },
      { maxWidth: 950, width: 400, height: 250 },
    ],
    baseWidth: 650,
    baseHeight: 410,
  });

  return <Image className="newsItemPage__image" src={image} alt={title} width={width} height={height}></Image>;
}
