import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

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
  whenKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.modalClose();
    }
  };
  closeOnClick = event => {
    if (event.target === event.currentTarget) {
      this.props.modalClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div
        className={css.overlay}
        onClick={this.closeOnClick}
        role="presentation"
      >
        <div className={css.modal}>{children}</div>
      </div>,
      document.getElementById('root')
    );
  }
}
export default Modal;
