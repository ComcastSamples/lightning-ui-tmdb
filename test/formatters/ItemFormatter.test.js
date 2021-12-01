import { chunkArray, convertItemsToTiles, convertTilesToRows} from 'src/api/formatters/ItemFormatter';
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testItem = {
  poster_path: 'path',
  title: 'test',
}

describe('#chunkArray', () => {
  it('should convert a single array into array of chunks', () => {
    expect(chunkArray(testArray)).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10]
    ]);
  });

  it('should convert a single array into array of chunks of 5', () => {
    expect(chunkArray(testArray, 5)).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10]
    ]);
  });
});

describe('#convertItemsToTiles', () => {
  it('should handle empty input', () => {
    expect(convertItemsToTiles()).toEqual([]);
  });

  it('should convert an array or items to tiles', () => {
    const tileItem = {
      w: 185,
      h: 278,
      title: testItem.title || testItem.name,
      data: testItem,
    }
    expect(convertItemsToTiles([testItem, testItem])).toEqual([
      expect.objectContaining(tileItem),
      expect.objectContaining(tileItem)
    ]);
  });

  describe('#convertTilesToRows', () => {
    it('should handle empty input', () => {
      expect(convertTilesToRows()).toEqual([]);
    });

    it('should convert an array or tiles to rows', () => {
      expect(convertTilesToRows([testItem])).toEqual([
        expect.objectContaining({
          itemSpacing: 52,
          h: 300,
          neverScroll: true
        }),
      ]);
    });
  });
});
