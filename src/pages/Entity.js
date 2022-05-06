import Page from './Page';
import { FocusManager, Button } from '@lightningjs/ui-components';
import RowWithTitle from '../components/RowWithTitle';
import EntityInfo from '../components/EntityInfo';
import { SCREEN, GRID, ALPHA, CORNER_RADIUS, getHexColor } from '@lightningjs/ui-components/Styles';

const Layout = {
  EntityInfo: {
    y: 600,
  },
  CastAndCrew: {
    y: 875,
  },
};

const Transitions = {
  EntityInfo: {
    SectionsContainer: {
      Items: {
        EntityInfo: {
          smooth: {
            y: Layout.EntityInfo.y,
            alpha: 1,
          },
        },
        CastAndCrew: {
          smooth: {
            y: Layout.CastAndCrew.y,
          },
        },
        Recommendations: {
          smooth: {
            y: Layout.CastAndCrew.y + 400,
          },
        },
      },
    },
    Bubble: {
      smooth: {
        x: GRID.margin.x / 2,
        y: Layout.EntityInfo.y,
        w: SCREEN.w - (GRID.margin.x / 2) * 2,
        h: 248,
      },
    },
  },
  CastAndCrew: {
    SectionsContainer: {
      Items: {
        EntityInfo: {
          smooth: {
            y: 0,
            alpha: 0.001,
          },
        },
        CastAndCrew: {
          smooth: {
            y: 80,
          },
        },
        Recommendations: {
          smooth: {
            y: 480,
          },
        },
      },
    },
    Bubble: {
      smooth: {
        w: SCREEN.w,
        h: SCREEN.h,
        x: 0,
        y: 0,
      },
    },
  },
};

export default class Entity extends Page {
  static _template() {
    return {
      _testId: 'ENTITY',
      _sectionTransitions: Transitions,
      ...super._template(),
      Backdrop: {
        w: SCREEN.w,
      },
      Bubble: {
        shader: { type: lng.shaders.RoundedRectangle, radius: CORNER_RADIUS.large },
        rtt: true,
        x: GRID.margin.x / 2,
        y: Layout.EntityInfo.y,
        w: SCREEN.w - (GRID.margin.x / 2) * 2,
        h: 248,
        Blur: {
          type: lng.components.FastBlurComponent,
          amount: 4,
          content: { Blur: {} },
          BackgroundColor: {
            w: SCREEN.w,
            h: SCREEN.h,
            rect: true,
            color: getHexColor('080808', ALPHA.overlays.bubble),
          },
        },
      },
      SectionsContainer: {
        type: FocusManager,
        direction: 'column',
        signals: {
          selectedChange: '_transitionSection',
        },
        items: [
          {
            ref: 'EntityInfo',
            type: EntityInfo,
            w: SCREEN.w,
            y: Layout.EntityInfo.y,
            h: 248,
            entityType: 'movie',
            zIndex: 1,
          },
          {
            ref: 'CastAndCrew',
            type: RowWithTitle,
            title: 'Cast and Crew',
            y: Layout.CastAndCrew.y,
            w: 700,
            x: GRID.margin.x / 2,
            h: 300,
            alpha: 0.8,
            itemSpacing: 32,
          },
          {
            ref: 'Recommendations',
            type: RowWithTitle,
            title: 'Recommendations',
            w: 700,
            x: GRID.margin.x / 2,
            h: 300,
            y: Layout.EntityInfo.y + 600,
            alpha: 0.8,
            itemSpacing: 32,
          },
        ],
      },
    };
  }

  _onChanged() {
    this.reset();
  }

  _handleEnter() {
    let fp = this.application.focusPath;
    let activeTile = fp[fp.length - 1].data || {};
    this.navigate(`${activeTile.media_type || 'people'}/${activeTile.id}`);
  }

  set entityInfo(info) {
    this._entityInfo = info;
    let { title, overview, name } = info;
    this.announce = (title || name) + ' \n ' + overview;
    this._EntityInfo.title = title || name;
    this._EntityInfo.shortSynopsis = overview;
    this._EntityInfo.buttons = {
      type: Button,
      title: 'Open Homepage',
      backgroundType: 'stroke',
      onEnter: () => {
        window.open(info.homepage);
      },
    };
  }

  get entityInfo() {
    return this._entityInfo;
  }

  get _EntityInfo() {
    return this._SectionsContainer.tag('Items.EntityInfo');
  }

  set recommendations(items) {
    this._SectionsContainer.tag('Items.Recommendations').items = items;
  }

  set castAndCrew(items) {
    this._SectionsContainer.tag('Items.CastAndCrew').items = items;
  }

  get id() {
    return 'EntityPage';
  }
}
