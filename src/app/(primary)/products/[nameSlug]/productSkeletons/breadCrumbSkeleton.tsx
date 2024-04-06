import './breadCrumbSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function BreadCrumbSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="bread-crumb-skeleton__container" data-testid="bread-crumb-skeleton">
        <Skeleton className="bread-crumb-skeleton" />
      </div>
    </SkeletonTheme>
  );
}
