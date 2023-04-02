import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ largeImage, smallImage, description }) => {
  return (
    <li className={css.item}>
      <a href={largeImage}>
        <img
          width="350px"
          src={smallImage}
          alt={description}
          data-large={largeImage}
        />
      </a>
    </li>
  );
};
ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImgFormat: PropTypes.string.isRequired,
  bigImgFormat: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
