import './userProfileSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function UserProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="user-profile-skeleton__container">
        <Skeleton width={35} height={35} borderRadius={50} className="user-profile-skeleton__round" />
        <div data-testid="user-profile-skeleton" className="user-profile-skeleton__info-container">
          <Skeleton width={25} height={15} className="user-profile-skeleton__row-one" />
          <Skeleton width={140} height={12} className="user-profile-skeleton__row-two" />
        </div>
      </div>
    </SkeletonTheme>
  );
}
