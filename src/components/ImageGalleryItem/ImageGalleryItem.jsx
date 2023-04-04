import css from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <li className={css.item} onClick={openModal}>
      <img src={smallImage} alt={description} data-large={largeImage} />
    </li>
  );
};

ImageGalleryItem.prototype = {
  description: propTypes.string,
  smallImage: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  openModal: propTypes.func.isRequired,
};

export default ImageGalleryItem;
