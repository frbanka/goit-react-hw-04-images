import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, description, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
        />
      ))}
    </ul>
  );
};
ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      smallImgFormat: PropTypes.string.isRequired,
      bigImgFormat: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ImageGallery;
