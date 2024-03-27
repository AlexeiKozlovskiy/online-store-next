import './googleButton.scss';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MODAL_WINDOWS } from '@/helpers/constant';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { CredentialGoogle, GoogleResp } from '@/types/types';

export function GoogleButton() {
  const { openModals, closeAnimationModal } = useCloseOpenModalsContext();
  const { setGoogleData } = useMyUserAuthContext();

  const { modalSignIN, modalSignUP } = openModals;
  const { SIGN_UP, SIGN_IN } = MODAL_WINDOWS;

  function hadelCallbackResponse(response: GoogleResp) {
    const googleData = jwtDecode<CredentialGoogle>(response.credential);
    setGoogleData(googleData);
    modalSignIN && closeAnimationModal(SIGN_IN);
    modalSignUP && closeAnimationModal(SIGN_UP);
  }

  useEffect(() => {
    if (window) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        callback: hadelCallbackResponse,
      });

      window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large',
        locale: 'EN',
        width: '400',
      });
    }
  }, [modalSignUP, modalSignIN]);

  return <button data-testid="google-btn" className="google-btn" id="signInDiv"></button>;
}
