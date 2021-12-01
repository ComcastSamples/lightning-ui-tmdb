import api, { getImageUrl } from '..';
import { convertItemsToTiles } from '../formatters/ItemFormatter';

export default function (page, { tvId }) {
  api.get(`/tv/${tvId}/recommendations`).then(({ results }) => {
    page.recommendations = convertItemsToTiles(results.slice(0, 10));
  });
  api.get(`/tv/${tvId}/credits`).then(({ cast }) => {
    page.castAndCrew = convertItemsToTiles(cast.slice(0, 10));
  });
  return api.get('/tv/' + tvId).then((data) => {
    page.tag('Backdrop').src = getImageUrl(data.backdrop_path, 'original');
    page.entityInfo = data;
  });
}
