'use client';
import { useMyURLContext } from '@/context/URLContext';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

interface IlinkCategories {
  children?: React.ReactNode;
  pathRedirect: string;
  srcImage: string;
  altImage: string;
}

export default function MainCategories({ children, pathRedirect, srcImage, altImage }: IlinkCategories) {
  const { removeAllSelected } = useMyURLContext();

  const mediaMatches766 = useMediaQuery('(max-width:766px)');
  const mediaMatches420 = useMediaQuery('(max-width:420px)');

  function checkSize() {
    if (mediaMatches420) {
      return 105;
    } else if (mediaMatches766) {
      return 132;
    } else {
      return 250;
    }
  }

  const imageSize = checkSize();

  function handleClickCategories() {
    removeAllSelected();
  }

  return (
    <Link onClick={handleClickCategories} href={pathRedirect}>
      <Image priority={true} width={imageSize} height={imageSize} src={srcImage} alt={altImage}></Image>
      {children}
    </Link>
  );
}
