import api, { getImageUrl } from '../';
import { convertItemsToTiles } from '../formatters/ItemFormatter';

export default function (page, { movieId }) {
  // api.get(`/movie/${movieId}/watch/providers`);
  api.get(`/movie/${movieId}/recommendations`).then(({ results }) => {
    page.recommendations = convertItemsToTiles(results.slice(0, 10));
  });
  api.get(`/movie/${movieId}/credits`).then(({ cast }) => {
    page.castAndCrew = convertItemsToTiles(cast.slice(0, 10));
  });
  return api.get('/movie/' + movieId).then((data) => {
    page.tag('Backdrop').src = getImageUrl(data.backdrop_path, 'original');
    page.entityInfo = data;
  });
}
