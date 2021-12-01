import lng from '@lightningjs/core';
import { Locale, Router } from '@lightningjs/sdk';

export default class Page extends lng.Component {
  static _template() {
    return {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080,
      SectionsContainer: {},
    };
  }

  _getFocused() {
    return this._SectionsContainer;
  }

  _transitionSection(selected) {
    let transition = this._sectionTransitions[selected.ref] || {};
    this.patch(transition);
  }

  navigate(path) {
    Router.navigate(path);
  }

  reset() {
    this._SectionsContainer.selectedIndex = 0;
  }

  /* istanbul ignore next */
  get announceContext() {
    return ['PAUSE-2', String(Locale.tr.ANNOUNCE_PAGE_HINTTEXT)];
  }

  get _SectionsContainer() {
    return this.tag('SectionsContainer');
  }
}
