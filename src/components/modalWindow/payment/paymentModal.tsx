import './../commonModal.scss';
import './payment.scss';
import { Form } from './form';
import { ButtonCross } from '@/components/buttonCross/buttonCross';

interface IPaymentModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function PaymentModal({ handelCloseModal }: IPaymentModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modalPayment">
      <div className="modal-page__container modalPayment animation-view-form">
        <ButtonCross dataId="modalPayment" onClickCross={() => handelCloseModal} adittionClassName="close-modal-cross" />
        <Form />
      </div>
    </div>
  );
}
