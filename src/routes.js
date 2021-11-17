import api, { getImageUrl } from './api';
import {
  convertItemsToTiles,
  chunkArray,
  convertTilesToRows,
} from './api/formatters/ItemFormatter';
import Browse from './pages/Browse';
import Entity from './pages/Entity';
import NotFound from './pages/NotFound';

export default {
  // First we define a root, this is the hash were the browser will point to
  // at the moment that you boot your app
  root: 'browse',
  // Next we can define the rest of our routes
  boot: api.loadConfig,
  routes: [
    {
      // this is a one level deep route.
      path: 'browse',
      // define the attached Component that the Router will show
      // on this route. If configured the Router will create an instance
      component: Browse,
      before(page) {
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
            let tiles = page.leftoverTiles.concat(convertItemsToTiles(trending.results));
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
        return page.getMoreRows().then(() => page.getMoreRows());
      },
    },
    {
      path: 'movie/:movieId',
      component: Entity,
      before(page, { movieId }) {
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
      },
    },
    {
      path: 'tv/:tvId',
      component: Entity,
      before(page, { tvId }) {
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
      },
    },
    {
      path: '*',
      component: NotFound,
      beforeNavigate() {
        Router.navigate('browse', false);
      },
    },
    // {
    //   path: 'account',
    //   component: Account,
    //   widgets: ['Menu'],
    // },
    // {
    //   // we can specify deeper route levels
    //   path: 'home/browse/adventure',
    //   component: Browse,
    // },
    // {
    //   // and as you can see we can define multiple routes that lead to the same page.
    //   path: 'home/browse/adventure/new',
    //   component: Browse,
    // },
    // {
    //   path: 'account/details/:action',
    //   component: Account,
    //   on({ page, action }) {
    //     // we fake that a async request went wrong and we're
    //     // rejecting the Promise.
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         reject('Something went wrong, ERROR 343011.22384.18765');
    //       }, 2000);
    //     });
    //   },
    // },
    // {
    //   path: '!',
    //   component: Error,
    // },
  ],
};
