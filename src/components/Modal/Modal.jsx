import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const Modal = ({ modalClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', whenKeyDown);

    return () => {
      window.removeEventListener('keydown', whenKeyDown);
    };
  });
  const whenKeyDown = event => {
    if (event.code === 'Escape') {
      modalClose();
    }
  };
  const closeOnClick = event => {
    if (event.target === event.currentTarget) {
      modalClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeOnClick} role="presentation">
      <div className={css.modal}>{children}</div>
    </div>,
    document.getElementById('root')
  );
};
export default Modal;
