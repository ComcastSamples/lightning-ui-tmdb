import Page from './Page';
import { Column } from '@lightningjs/ui-components';
import { Language } from '@lightningjs/sdk';

export default class Browse extends Page {
  static _template() {
    return {
      _testId: 'BROWSE',
      title: Language.translate('BROWSE_TITLE'),
      ...super._template(),
      Title: {
        text: {
          text: 'All Trending - Week',
        },
        x: 42,
        y: 30,
        zIndex: 10,
      },
      Wrapper: {
        x: 42,
        y: 75,
        h: 900,
        w: 1800,
        clipping: true,
        Column: {
          x: 21,
          y: 40,
          type: Column,
          itemSpacing: 42,
          plinko: true,
          signals: {
            selectedChange: '_loadMoreRows',
          },
        },
      },
    };
  }

  get id() {
    return 'BrowsePage';
  }

  announce() {
    return 'All Trending - Week';
  }

  // Overriden in routes
  getMoreRows() {}

  reset() {
    this._Column.items = [];
  }

  _loadMoreRows() {
    const BUFFER = 5;
    const c = this._Column;
    const nearBottom = c.items.length && c.selectedIndex > c.items.length - BUFFER;

    if (nearBottom) {
      this.getMoreRows();
    }
  }

  _captureEnter() {
    let fp = this.application.focusPath;
    let activeTile = fp[fp.length - 1].data || {};
    this.navigate(`${activeTile.media_type}/${activeTile.id}`);
  }

  get _Column() {
    return this.tag('Wrapper.Column');
  }

  _getFocused() {
    return this._Column;
  }
}
