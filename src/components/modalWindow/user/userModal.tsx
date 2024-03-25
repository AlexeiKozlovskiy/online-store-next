import './userModal.scss';
import { ROUTE } from '@/types/types';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/components/userProfile/userProfile';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { MODAL_WINDOWS } from '@/helpers/constant';

interface IUserModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeAnimationModal: (modalType: string) => void;
}

export const UserModal = ({ handelCloseModal, closeAnimationModal }: IUserModal) => {
  const { logOut } = useMyUserAuthContext();
  const router = useRouter();
  const { USER } = MODAL_WINDOWS;

  function handelClickProfile() {
    closeAnimationModal(USER);
    router.push(ROUTE.PROFILE);
  }

  function handelClickLogout() {
    closeAnimationModal(USER);
    logOut();
    router.push(ROUTE.MAIN);
  }

  return (
    <div data-testid="user-modal-overlay" className="user-modal-overlay" onClick={handelCloseModal} data-id="modalUser">
      <div className="user-modal modalUser">
        <div className="user-modal__account">Account</div>
        <UserProfile />
        <hr className="user-modal__line"></hr>
        <ul className="user-modal__list">
          <li className="user-modal__my-profile" onClick={handelClickProfile}>
            <button className="user-modal__button">My profile</button>
          </li>
          <li className="user-modal__log-out" onClick={handelClickLogout}>
            <button className="user-modal__button">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
