'use client';
import { useMyURLContext } from '@/context/URLContext';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaMatches } from '@/hooks/mediaMatchesHook';

interface IlinkCategories {
  children?: React.ReactNode;
  pathRedirect: string;
  image: string;
  altImage: string;
}

export default function MainCategories({ children, pathRedirect, image, altImage }: IlinkCategories) {
  const { removeAllSelected } = useMyURLContext();
  const { width, height } = useMediaMatches({
    mediaPoints: [
      { maxWidth: 420, width: 105, height: 105 },
      { maxWidth: 766, width: 132, height: 132 },
    ],
    baseWidth: 250,
    baseHeight: 250,
  });

  function handleClickCategories() {
    removeAllSelected();
  }

  return (
    <Link onClick={handleClickCategories} href={pathRedirect}>
      <Image priority={true} width={width} height={height} src={image} alt={altImage}></Image>
      {children}
    </Link>
  );
}
