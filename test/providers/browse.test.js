import browseProvider from 'src/api/providers/browse.js';
import trending from 'test/mocks/trending.json';

let trendingWithAdult = JSON.parse(JSON.stringify(trending));
trendingWithAdult.results[3].adult = true;
trendingWithAdult.results[7].adult = true;

describe('browse provider', () => {
  let pageStub;
  beforeEach(() => {
    pageStub = {
      reset: jest.fn(),
      _Column: {
        appendItems: jest.fn()
      }
    };
    return browseProvider(pageStub);
  });

  it('calls trending twice', () => {
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('calls reset', () => {
    expect(pageStub.reset).toHaveBeenCalled();
  });

  it('updates apiIndex', () => {
    expect(pageStub.apiIndex).toEqual(2);
  });

  it('appends items to column', () => {
    expect(pageStub._Column.appendItems).toHaveBeenCalled();
  });

  it('doesnt load things twice', async () => {
    await browseProvider(pageStub);
    expect(pageStub.reset).toHaveBeenCalledTimes(1);
  });

  it('filters adult content', async () => {
    fetch.mockResponseOnce(JSON.stringify(trendingWithAdult));
    await browseProvider(pageStub);
    expect(pageStub.leftoverTiles.length).toEqual(5);
  });
});
