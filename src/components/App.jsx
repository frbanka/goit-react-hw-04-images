import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchPhotos from './Fetch/Fetch';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App = () => {
  const [modalOn, setModalOn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [imgPerPage, setImgPerPage] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImgUrl, setCurrentImgUrl] = useState(null);
  const [currentImgTag, setCurrentImgTag] = useState('');
  const [totalImg, setTotalImg] = useState(0);

  const searchRequest = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setLoading(true);

    fetchPhotos(search)
      .then(({ hits, totalHits }) => {
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        return (
          setPage(1),
          setImages(imagesArray),
          setImgPerPage(imagesArray.length),
          setTotalImg(prevHits => prevHits + totalHits)
        );
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos(search, page)
        .then(({ hits }) => {
          const newImagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return (
            setImages(prevImages => [...prevImages, ...newImagesArray]),
            setImgPerPage(
              prevImgPerPage => prevImgPerPage + newImagesArray.length
            )
          );
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [search, page]);

  const getImageLink = () => {
    const largeImgItem = images.find(image => {
      return image.id === currentImgId;
    });
    return largeImgItem;
  };

  const openModal = e => {
    setCurrentImgUrl(e.target.dataset.large);
    setCurrentImgTag(e.target.alt);
    if (e.target.nodeName === 'IMG') {
      setModalOn(true);
    }
  };

  const closeModal = () => setModalOn(false);

  return (
    <section>
      <Searchbar onSubmit={searchRequest} />
      {images && <ImageGallery openModal={openModal} images={images} />}
      {imgPerPage >= 12 && imgPerPage < totalImg && (
        <Button loadMore={loadMoreImg} />
      )}
      {isLoading === true && <Loader />}
      {modalOn && (
        <Modal modalClose={closeModal}>
          <img src={currentImgUrl} alt={currentImgTag} />
        </Modal>
      )}
    </section>
  );
};

export default App;
