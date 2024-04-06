'use client';
import './imgsSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useWindowSize } from '@/hooks/windowSize';

export function ImgsSkeleton() {
  const size = useWindowSize();

  let miniImgWidth = '90px';
  let miniImgHeight = '90px';
  let maxImgWidth = '400px';
  let maxImgHeight = '400px';

  if (size.width! <= 768) {
    miniImgWidth = '50px';
    miniImgHeight = '50px';
    maxImgWidth = '280px';
    maxImgHeight = '280px';
  }

  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="img-skeleton">
        <div className="img-skeleton__mini-img-container">
          <Skeleton width={miniImgWidth} height={miniImgHeight} className="img-skeleton__mini-img" />
          <Skeleton width={miniImgWidth} height={miniImgHeight} className="img-skeleton__mini-img" />
        </div>
        <Skeleton width={maxImgWidth} height={maxImgHeight} className="img-skeleton__max-img" />
      </div>
    </SkeletonTheme>
  );
}
