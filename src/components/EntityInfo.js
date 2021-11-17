import lng from '@lightningjs/core';
import { GRID, TYPOGRAPHY, SCREEN } from '@lightningjs/ui-components/Styles';
import { MarqueeText } from '@lightningjs/ui-components';

export default class EntityInfo extends lng.Component {
  static _template() {
    const maxTitleWidth = 1200;
    return {
      x: GRID.margin.x,
      Title: {
        _testId: 'ENTITYVIEW_TITLE',
        y: 0,
        type: MarqueeText,
        w: maxTitleWidth,
      },
      ShortSynopsis: {
        _testId: 'ENTITYVIEW_SHORTSYNOPSIS',
        y: GRID.spacingIncrement * 8,
        w: maxTitleWidth,
        text: {
          ...TYPOGRAPHY.headline2,
          maxLines: 1,
        },
      },
    };
  }

  _focus() {
    super._focus();
    this._Title.startScrolling && this._Title.startScrolling();
  }

  _unfocus() {
    super._unfocus();
    this._Title.stopScrolling && this._Title.stopScrolling();
  }

  _getFocused() {
    return this._WatchOptions || this;
  }

  set buttons(buttons) {
    this.patch({
      WatchOptions: {
        loading: false,
        ...buttons,
        y: GRID.spacingIncrement * 16,
      },
    });
    this._refocus();
  }

  set title(title) {
    this._Title.text = { ...TYPOGRAPHY.display2, text: title };
  }

  set shortSynopsis(shortSynopsis) {
    this._ShortSynopsis.text = shortSynopsis;
  }

  get _Title() {
    return this.tag('Title');
  }
  get _ShortSynopsis() {
    return this.tag('ShortSynopsis');
  }
  get _WatchOptions() {
    return this.tag('WatchOptions');
  }
}
