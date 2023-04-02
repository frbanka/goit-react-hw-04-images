import axios from 'axios';
async function fetchPhotos(search, page = 1) {
  const key = '33207584-dc406ff59b7ec425217ee82ec';
  return await axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
    )
    .then(response => response.json())
    .catch(error => console.log(error.response.json()));
}
export default fetchPhotos;
