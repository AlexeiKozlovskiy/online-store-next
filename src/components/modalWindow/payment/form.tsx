import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { CartItem, MyForms, RootReducerProps } from '@/types/types';
// import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/hooks/formsInputsHelperHook';
import { FormInput } from '@/components/formInput/formInput';
import { useFormsValidation } from '@/hooks/formsValidationHook';
import { CARD_IMAGES, TEST_USER_DATA } from '@/helpers/constant';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
// import { useMyProfileUserContext } from '@/context/profileUserContext';
import { removeAllCart } from '@/store/controller';
import { useTotalCartInfo } from '@/hooks/totalCartInfo';
import { useRouter } from 'next/navigation';
import { Preloader } from '@/components/preloader/preloader';

export function Form() {
  const imageCard = useRef('');
  const router = useRouter();

  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<MyForms>({
    defaultValues: {
      formProfile: {},
    },
  });
  const {
    validateName,
    validateAddress,
    validatePhone,
    validateNameCard,
    validateNumderCard,
    validateDateCard,
    validateCvvCard,
    errorDefinitions,
  } = useFormsValidation();
  const { user } = useMyUserAuthContext();
  useFormsInputsHelper({ watch, setValue });
  // const { profileData, updateUserProfile } = useMyProfileUserContext();
  const { totalPriseByPromocode } = useTotalCartInfo();
  const [showPreloader, setShowPreloader] = useState(false);

  const { formProfile } = errors;
  const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } = formProfile || {};
  const errorsName = name?.type;
  const errorsAddress = address?.type;
  const errorsEmail = email?.type;
  const errorsPhone = phone?.type;
  const errorsNameCard = nameCard?.type;
  const errorsNumderCard = numberCard?.type;
  const errorsDateCard = dateCard?.type;
  const errorsCvvCard = cvvCard?.type;

  const onSubmit = ({ formProfile }: MyForms) => {
    setShowPreloader(true);
    const { email, ...dataForm } = formProfile;
    // updateUserProfile(dataForm);

    const orderExempleData = {
      userID: user?.id,
      paymentData: {
        totalPriceOrder: totalPriseByPromocode,
      },
      buyProducts: cartItemsState.map(({ product, quantity }) => {
        return {
          IDProduct: product.id,
          nameProduct: product.name,
          quantity,
        };
      }),
    };
    console.log(orderExempleData);

    setTimeout(() => {
      setShowPreloader(false);
      reset();
      removeAllCart();
      router.push('/');
    }, 2000);
  };

  // useEffect(() => {
  //   async function getProfile() {
  //     if (profileData) {
  //       setValue('formProfile', profileData);
  //     }
  //   }
  //   getProfile();
  // }, [profileData]);

  useEffect(() => {
    function checkImageCard() {
      const curImage = CARD_IMAGES[watch('formProfile.numberCard')[0]];
      imageCard.current = curImage;
    }
    checkImageCard();
  }, [watch('formProfile'), watch('formProfile.numberCard')]);

  useEffect(() => {
    user && setValue('formProfile.email', user.email);
  }, [watch('formProfile')]);

  function testDataClick() {
    setValue('formProfile', TEST_USER_DATA);
  }

  return (
    <>
      <form className="profile-form__modal" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-form__info">
          <h4 className="profile-form__title">PAYMENT DETAILS</h4>
          <FormInput
            id="nameInput"
            name={watch('formProfile.name') && 'Name'}
            type="text"
            placeholder="Name"
            register={register}
            registerType="formProfile.name"
            isValid={isValid}
            validate={validateName}
            errors={errorsName}
            errorDefinitions={errorDefinitions.name}
          />
          <FormInput
            id="addressInput"
            name={watch('formProfile.address') && 'Address'}
            type="text"
            placeholder="Address"
            register={register}
            registerType="formProfile.address"
            isValid={isValid}
            validate={validateAddress}
            errors={errorsAddress}
            errorDefinitions={errorDefinitions.address}
          />
          <FormInput
            id="emailInput"
            type="text"
            name={watch('formProfile.email') && 'Email'}
            disabled={true}
            required={false}
            placeholder="Email"
            register={register}
            registerType="formProfile.email"
            isValid={isValid}
            errors={errorsEmail}
            errorDefinitions={errorDefinitions.email}
          />
          <FormInput
            id="phoneInput"
            type="tel"
            name={watch('formProfile.phone') && 'Phone'}
            placeholder="Phone +375 ..."
            register={register}
            registerType="formProfile.phone"
            isValid={isValid}
            validate={validatePhone}
            errors={errorsPhone}
            errorDefinitions={errorDefinitions.phone}
          />
        </div>
        <div className="payment-method__top">
          <h4 className="profile-form__title">PAYMENT METHOD</h4>
          <div className={`payment-method__cards ${imageCard.current ? imageCard.current : ''}`}>
            <div className="cards__img"></div>
          </div>
        </div>
        <div className="profile-form__info">
          <FormInput
            id="cardInput"
            type="text"
            name={watch('formProfile.nameCard') && 'Name on card'}
            placeholder="Name on card"
            register={register}
            registerType="formProfile.nameCard"
            isValid={isValid}
            validate={validateNameCard}
            errors={errorsNameCard}
            errorDefinitions={errorDefinitions.nameCard}
          />
          <FormInput
            id="numberCartInput"
            type="text"
            name={watch('formProfile.numberCard') && 'Number card'}
            placeholder="хxxx xxxx xxxx xxxx"
            register={register}
            registerType="formProfile.numberCard"
            isValid={isValid}
            validate={validateNumderCard}
            errors={errorsNumderCard}
            errorDefinitions={errorDefinitions.numberCard}
          />
          <div className="profile-form__info bottom-row">
            <FormInput
              id="dateCartInput"
              type="text"
              name={watch('formProfile.dateCard') && 'MM/YY'}
              placeholder="MM/YY"
              className="bottom-row__date"
              register={register}
              registerType="formProfile.dateCard"
              isValid={isValid}
              validate={validateDateCard}
              errors={errorsDateCard}
              errorDefinitions={errorDefinitions.dateCard}
            />
            <FormInput
              id="cvvCardInput"
              type="text"
              name={watch('formProfile.cvvCard') && 'CVV'}
              placeholder="CVV"
              className="bottom-row__cvv"
              register={register}
              registerType="formProfile.cvvCard"
              isValid={isValid}
              validate={validateCvvCard}
              errors={errorsCvvCard}
              errorDefinitions={errorDefinitions.cvvCard}
            />
          </div>
        </div>
        <button className="main-modal-btn">Place order now</button>
        <div className="payment-test" onClick={testDataClick}>
          Test payment data
        </div>
        {showPreloader && <Preloader additionalClassname="preloader-modal" />}
      </form>
    </>
  );
}
