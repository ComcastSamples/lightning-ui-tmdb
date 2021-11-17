import { Router, Utils, Language } from '@lightningjs/sdk';
import { withAnnouncer, getHexColor } from '@lightningjs/ui-components';
import routes from './routes';

export default class App extends withAnnouncer(Router.App) {
  static language() {
    return 'en';
  }

  static _template() {
    return {
      Pages: {
        w: 1920,
        h: 1080,
      },
      TMDB: {
        x: 1700,
        y: 30,
        zIndex: 20,
        texture: lng.Tools.getSvgTexture('static/tmdb-logo.svg', 190, 81),
      },
      TMDB_Text: {
        x: 1710,
        y: 120,
        zIndex: 20,
        text: {
          fontSize: 16,
          textAlign: 'center',
          maxLines: 2,
          text: 'Powered by TMDB API',
          //textColor: 0xffff00ff,
        },
      },
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        zIndex: -900,
        color: getHexColor('092f40'),
      },
    };
  }

  _handleLast() {
    Router.back();
  }

  _handleMenu() {
    Router.navigate(routes.root);
  }

  _handleVoiceGuidance() {
    this.announcerEnabled = !this.announcerEnabled;
  }

  _handleDebug() {
    this.debug = !this.debug;
  }

  _setup() {
    Router.startRouter(routes);
  }

  /**
   * Emit an event to update the global background using the page's individual background params
   * (which can be extended by the page's states).
   */
  $updateApp(params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (this._hasMethod(key)) {
        this[key](params[key]);
      }
    });
  }

  background(url) {
    this._Background.src = url;
  }

  get _Background() {
    return this.tag('Background');
  }
}
