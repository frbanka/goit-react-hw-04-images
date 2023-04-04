import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchPhotos from './Fetch/Fetch';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    search: '',
    page: 1,
    totalImg: 0,
    imgPerPage: 0,
    isLoading: false,
    modalOn: false,
    images: [],
    error: null,
    currentImgUrl: null,
    currentImgTag: '',
  };

  searchRequest = search => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMoreImg = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchPhotos(search)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imgPerPage: imagesArray.length,
            totalImg: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchPhotos(search, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imgPerPage }) => {
            return {
              images: [...images, ...imagesArray],
              imgPerPage: imgPerPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getImageLink = () => {
    const largeImgItem = this.state.images.find(image => {
      return image.id === this.state.currentImgId;
    });
    return largeImgItem;
  };

  openModal = e => {
    const currentImgUrl = e.target.dataset.large;
    const currentImgTag = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ modalOn }) => ({
        modalOn: !modalOn,
        currentImgUrl: currentImgUrl,
        currentImgTag: currentImgTag,
      }));
    }
  };

  closeModal = () => this.setState({ modalOn: false });

  render() {
    const {
      images,
      imgPerPage,
      totalImg,
      isLoading,
      modalOn,
      currentImgTag,
      currentImgUrl,
    } = this.state;

    const searchRequest = this.searchRequest;
    const openModal = this.openModal;
    const closeModal = this.closeModal;
    const loadMoreImg = this.loadMoreImg;

    return (
      <section>
        <Searchbar onSubmit={searchRequest} />
        {images && <ImageGallery openModal={openModal} images={images} />}
        {imgPerPage >= 12 && imgPerPage < totalImg && (
          <Button loadMore={loadMoreImg} />
        )}
        {isLoading && <Loader />}
        {modalOn && (
          <Modal modalClose={closeModal}>
            <img src={currentImgUrl} alt={currentImgTag} />
          </Modal>
        )}
      </section>
    );
  }
}

export default App;
