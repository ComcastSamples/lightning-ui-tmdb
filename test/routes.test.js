import { Router } from '@lightningjs/sdk';
import App from 'src/';
import settings from '../settings.json';

const app = App({
  stage: { ...settings['appSettings'].stage, useImageWorker: false, debug: false },
  debug: false
}, settings['platformSettings']);

describe('routes', () => {
  it('should have a browse route', (done) => {
    Router.navigate('browse');
    setTimeout(() => {
      expect(Router.getActivePage().constructor.name).toBe('Browse');
      done();
    }, 20);
  });

  it('should have a movie route', (done) => {
    Router.navigate('movie/1234');
    setTimeout(() => {
      expect(Router.getActivePage().constructor.name).toBe('Entity');
      done();
    }, 20);
  });

  it('should have a tv route', (done) => {
    Router.navigate('tv/1234');
    setTimeout(() => {
      expect(Router.getActivePage().constructor.name).toBe('Entity');
      done();
    }, 20);
  });

  it('should redirect to browse on 404', (done) => {
    Router.navigate('banana/1234');
    setTimeout(() => {
      expect(Router.getActivePage().constructor.name).toBe('Browse');
      done();
    }, 20);
  });
});
