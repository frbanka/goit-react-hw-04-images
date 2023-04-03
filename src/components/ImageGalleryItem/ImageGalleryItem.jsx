import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({
  id,
  largeImage,
  smallImage,
  description,
  showLargeImage,
}) => {
  return (
    <li className={css.item} onClick={() => showLargeImage(id)} id={id}>
      <img width="350px" src={smallImage} alt={description} />
    </li>
  );
};
ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImgFormat: PropTypes.string.isRequired,
  bigImgFormat: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
