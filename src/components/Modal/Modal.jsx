import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propsTypes = {
    modalClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.whenKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.whenKeyDown);
  }
  whenKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalClose();
    }
  };
  closeOnClick = e => {
    if (e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div onClick={closeOnClick}>
        <div>{children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
