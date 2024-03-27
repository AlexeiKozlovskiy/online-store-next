'use client';
import './userIcon.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMyUserAuthContext } from '@/context/UserAuthContext';

export interface IUserIcon {
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function UserIcon({ handleClick }: IUserIcon) {
  const { user } = useMyUserAuthContext();
  const [userData, setUserData] = useState({ name: '', userImage: '' });
  const { name, userImage } = userData;

  useEffect(() => {
    if (user) {
      const { isGoogle, picture, login } = user;

      if (isGoogle && picture) {
        setUserData({ name: '', userImage: picture });
      } else {
        const name = login.slice(0, 1).toUpperCase();
        setUserData({ name, userImage: '' });
      }
    }
  }, [user?.login]);

  const userPicture = (
    <Image
      className="google-logo"
      data-testid="user-image"
      data-id="modalUser"
      src={userImage}
      alt="user image"
      onClick={handleClick}
      width={35}
      height={35}
    />
  );

  return (
    <div data-testid="user-icon" data-id="modalUser" className="user-icon" onClick={handleClick}>
      {userImage ? userPicture : name}
    </div>
  );
}
