import api from '../';
import { convertItemsToTiles, chunkArray, convertTilesToRows } from '../formatters/ItemFormatter';

export default function (page) {
  if (page.loaded) {
    return Promise.resolve();
  }
  page.apiIndex = 0;
  page.loaded = true;
  page.reset();
  page.leftoverTiles = [];
  page.getMoreRows = () => {
    page.apiIndex++;
    return api.get('/trending/all/week?page=' + page.apiIndex).then((trending) => {
      let results = trending.results.filter((r) => !r.adult);
      let tiles = page.leftoverTiles.concat(convertItemsToTiles(results));
      let chunks = chunkArray(tiles);
      if (chunks[chunks.length - 1].length < 7) {
        page.leftoverTiles = chunks.pop();
      } else {
        page.leftoverTiles = [];
      }
      page._Column.appendItems(convertTilesToRows(chunks));
    });
  };
  //Initial load call twice to get enough rows
  return page.getMoreRows().then(page.getMoreRows);
}
