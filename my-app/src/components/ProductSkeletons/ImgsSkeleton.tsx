import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './ImgsSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function ImgsSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="img-skeleton">
        <div className="img-skeleton__mini-img-container">
          <Skeleton width="90px" height="90px" className="img-skeleton__mini-img" />
          <Skeleton width="90px" height="90px" className="img-skeleton__mini-img" />
        </div>

        <Skeleton width="400px" height="400px" className="img-skeleton__max-img" />
      </div>
    </SkeletonTheme>
  );
}
