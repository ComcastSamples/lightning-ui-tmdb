import API_KEY_V4 from './key';
const API_BASE = 'https://api.themoviedb.org/3';
let tmdbConfig;
let baseImageUrl;
const basePosterSize = 'w185';

const defaultFetchParams = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getImageUrl(path, posterSize = basePosterSize) {
  return baseImageUrl + posterSize + path;
}

function get(path, params = {}) {
  path += path.indexOf('?') == -1 ? '?' : '&';
  return fetch(API_BASE + path + 'api_key=' + API_KEY_V4, {
    ...defaultFetchParams,
    ...params,
  }).then((r) => r.json());
}

function loadConfig() {
  return get('/configuration').then((data) => {
    tmdbConfig = data;
    baseImageUrl = data.images?.base_url;
    return data;
  });
}

export default {
  get,
  loadConfig,
};
