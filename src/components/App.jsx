import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchPhotos from './Fetch/Fetch';
class App extends Component {
  state = {
    search: '',
    page: 1,
    imgPerPage: 0,
    totalImg: 0,
    isLoading: false,
    modalOn: false,
    images: null,
    error: null,
    currentImgUrl: null,
    currentImgDescription: null,
  };
  searchRequest = search => {
    this.setState({ search });
  };
  loadMoreImg = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  componentDidUpdate(prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchPhotos(search)
        .then(({ hits, totalHits }) => {
          const imagesArr = hits.map(hit => ({
            photoId: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArr,
            imgPerPage: imagesArr.length,
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

      fetchImages(search, page)
        .then(({ hits }) => {
          const imagesArr = hits.map(hit => ({
            photoId: hit.id,
            description: hit.tags,
            smallImg: hit.webformatURL,
            largeImg: hit.largeImageURL,
          }));

          return this.setState(({ images, imgPerPage }) => {
            return {
              images: [...images, ...imagesArray],
              imgPerPage: imgPerPage + imagesArr.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  render() {
    const {
      images,
      imgPerPage,
      totalImg,
      isLoading,
      modalOn,
      currentImUrl,
      currentImgDescription,
    } = this.state;

    const searchRequest = this.searchRequest;
    const loadMore = this.loadMore;
    const openModal = this.modalOn;
    return (
      <section>
        <Searchbar onSubmit={searchRequest} />
        {images && <ImageGallery images={images} />}
        {imgPerPage >= 12 && imgPerPage < totalImg && (
          <Button loadMore={loadMore} />
        )}
      </section>
    );
  }
}
export default App;
