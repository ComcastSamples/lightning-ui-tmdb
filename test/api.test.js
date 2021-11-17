import api, { getImageUrl } from 'src/api';
import trending from 'test/mocks/trending.json';
import configuration from 'test/mocks/configuration.json';

describe('api', () => {
  it('#loadConfig', async () => {
    expect(await api.loadConfig()).toEqual(configuration);
  });

  it('#getImageUrl', () => {
    expect(getImageUrl('/path')).toEqual('http://image.tmdb.org/t/p/w185/path');
  });

  it('#get', async () => {
    expect(await api.get('/trending')).toEqual(trending);
  });
});
