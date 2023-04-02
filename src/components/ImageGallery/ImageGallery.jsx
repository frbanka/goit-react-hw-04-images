import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ photoId, description, smallImgFormat, bigImgFormat }) => (
        <ImageGalleryItem
          key={photoId}
          description={description}
          smallImage={smallImgFormat}
          largeImage={bigImgFormat}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
