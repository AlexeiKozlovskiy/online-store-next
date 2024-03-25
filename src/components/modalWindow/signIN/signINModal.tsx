import './../commonModal.scss';
import './signINModal.scss';
import { Form } from './form';
import { ButtonCross } from '@/components/buttonCross/buttonCross';

interface ISignINModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignINModal({ handelCloseModal }: ISignINModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modalSignIN">
      <div className="modal-page__container modalSignIN animation-view-form">
        <ButtonCross dataId="modalSignIN" onClickCross={() => handelCloseModal} adittionClassName="close-modal-cross" />
        <Form />
      </div>
    </div>
  );
}
