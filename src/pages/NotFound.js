import Page from './Page';
import { TYPOGRAPHY, getHexColor } from '@lightningjs/ui-components';

export default class NotFound extends Page {
  static _template() {
    return {
      _testId: 'NotFound',
      title: 'Not Found',
      ...super._template(),
      SectionsContainer: {
        x: 30,
        y: 30,
        Title: {
          text: {
            ...TYPOGRAPHY.display1,
            text: '404 Page Not Found',
            textColor: getHexColor('#000000'),
          },
        },
      },
    };
  }

  _getFocused() {
    return this;
  }
}
