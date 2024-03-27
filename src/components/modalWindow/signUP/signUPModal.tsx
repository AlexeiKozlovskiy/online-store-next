import './../commonModal.scss';
import './signUPModal.scss';
import { Form } from './form';
import { ButtonCross } from '@/components/buttonCross/buttonCross';

interface ISignUPModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignUPModal({ handelCloseModal }: ISignUPModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modalSignUP">
      <div className="modal-page__container modalSignUP animation-view-form">
        <ButtonCross dataId="modalSignUP" onClickCross={() => handelCloseModal} adittionClassName="close-modal-cross" />
        <Form />
      </div>
    </div>
  );
}
