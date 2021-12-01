import api from './api';
import Browse from './pages/Browse';
import Entity from './pages/Entity';
import NotFound from './pages/NotFound';
import browseProvider from './api/providers/browse';
import movieProvider from './api/providers/movie';
import tvProvider from './api/providers/tv';
import { Router } from '@lightningjs/sdk';

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
      before: browseProvider,
    },
    {
      path: 'movie/:movieId',
      component: Entity,
      before: movieProvider,
    },
    {
      path: 'tv/:tvId',
      component: Entity,
      before: tvProvider,
    },
    {
      path: '*',
      component: NotFound,
      beforeNavigate() {
        Router.navigate('browse', false);
      },
    },
  ],
};
