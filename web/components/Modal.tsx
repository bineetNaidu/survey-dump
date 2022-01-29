import { FC } from 'react';
import Modal, { RenderModalBackdropProps } from 'react-overlays/Modal';

interface BaseModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  containerClassName?: HTMLElement['className'];
}

const Backdrop: FC<RenderModalBackdropProps> = () => {
  return (
    <div className="fixed inset-0 z-[8] bg-black opacity-75 transition-all "></div>
  );
};

export const BaseModal: FC<BaseModalProps> = ({
  setShow,
  show,
  children,
  containerClassName,
}) => {
  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <Backdrop {...props} />
  );

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      renderBackdrop={renderBackdrop}
      aria-labelledby="modal-label"
      className={`${containerClassName} fixed w-2/3 top-[50%] left-[50%] z-[10] bg-white p-20 border border-gray-300 -translate-x-2/4 -translate-y-2/4 transition-all duration-300 ease-in-out`}
    >
      <>{children}</>
    </Modal>
  );
};
