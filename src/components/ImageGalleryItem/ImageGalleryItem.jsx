const ImageGalleryItem = ({
  bigImgFormat,
  smallImgFormat,
  photoId,
  description,
}) => {
  return (
    <li>
      <a href={bigImgFormat}>
        <img src={smallImgFormat} alt={description} id={photoId} />
      </a>
    </li>
  );
};
export default ImageGalleryItem;
