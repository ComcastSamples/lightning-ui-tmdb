import { Row } from '@lightningjs/ui-components';
import Tile from '../../components/Tile';
import { getImageUrl } from '../index';

export function chunkArray(array, size = 7) {
  let result = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function convertItemsToTiles(items = []) {
  return items.map((item) => {
    return {
      type: Tile,
      src: getImageUrl(item.poster_path || item.profile_path),
      w: 185,
      h: 278,
      title: item.title || item.name,
      data: item,
    };
  });
}

export function convertTilesToRows(items = []) {
  return items.map((items) => ({
    type: Row,
    itemSpacing: 52,
    h: 300,
    neverScroll: true,
    items,
  }));
}
