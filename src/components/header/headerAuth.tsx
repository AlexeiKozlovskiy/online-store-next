'use client';
import './headerAuth.scss';
interface IHeaderAuth {
  handelClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function HeaderAuth({ handelClick }: IHeaderAuth) {
  return (
    <>
      <button className="header-auth__btn-sign-in" data-id="modalSignIN" onClick={handelClick}>
        Sign In
      </button>
      <div className="header-auth-signup">
        <p className="header-auth__text">Not a Member?</p>
        <button className="header-auth__btn-sign-up" data-id="modalSignUP" onClick={handelClick}>
          Sign up
        </button>
      </div>
    </>
  );
}
