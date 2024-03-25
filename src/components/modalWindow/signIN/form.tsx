import { LogoStore } from '@/components/logoStore/logoStore';
import { useForm } from 'react-hook-form';
// import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/hooks/formsInputsHelperHook';
import { MyForms } from '@/types/types';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { GoogleButton } from '@/components/googleButton/googleButton';
import { FormInput } from '@/components/formInput/formInput';
import { useFormsValidation } from '@/hooks/formsValidationHook';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';

export function Form() {
  const { getSignIN, showPreloader, errorUser } = useMyUserAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<MyForms>({
    defaultValues: {
      formSignIN: {
        email: '',
        password: '',
      },
    },
  });
  useFormsInputsHelper({ watch, setValue });
  const { validateEmail, validatePassword, errorDefinitions } = useFormsValidation();
  const { setOpenModals } = useCloseOpenModalsContext();

  const { formSignIN } = errors;
  const { password, email } = formSignIN || {};
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = ({ formSignIN }: MyForms) => {
    getSignIN(formSignIN);
    reset({ formSignIN: { password: '' } });
  };

  function getSignUP() {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      modalSignIN: false,
      modalSignUP: true,
    }));
  }

  const ErrorSignIN = <div className="form-error-response">{errorUser}</div>;

  return (
    <>
      <form className="signIN-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signIN-details">
          <div className="signIN-details__title">SIGN IN</div>
          <div className="signIN-details__logo">
            <LogoStore />
          </div>
          <div className="signIN-details__info">
            <GoogleButton />
            <p className="hr">Or</p>
            <FormInput
              id="emailInputSignIN"
              type="text"
              name={watch('formSignIN.email') && 'Email'}
              placeholder="Email"
              register={register}
              registerType="formSignIN.email"
              isValid={isValid}
              validate={validateEmail}
              errors={errorsEmail}
              errorDefinitions={errorDefinitions.email}
            />
            <FormInput
              id="paswordInputSignIN"
              type="password"
              name={watch('formSignIN.password') && 'Password'}
              placeholder="Password"
              register={register}
              registerType="formSignIN.password"
              isValid={isValid}
              validate={validatePassword}
              errors={errorsPassword}
              errorDefinitions={errorDefinitions.password}
            />
          </div>
          {/* <div className="signIN__forgot">
            <span>Forgot password?</span>
          </div> */}
          <button className="main-modal-btn">Log In</button>

          <div className="signIN-already">
            <span>{`Don't have an account?`}</span>
            <span className="signIN-already__highlight" onClick={getSignUP}>
              Sign up
            </span>
          </div>
          {/* {showPreloader && <Preloader />} */}
          {errorUser && ErrorSignIN}
        </div>
      </form>
    </>
  );
}
