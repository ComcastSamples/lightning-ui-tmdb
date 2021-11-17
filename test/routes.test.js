import routerConfig from 'src/routes.js';

describe('routes', () => {
  describe('*', () => {
    it('exists', () => {
      expect(routerConfig.routes).toContainEqual(expect.objectContaining({ path: '*'}));
    });
  });

  describe('browse page', () => {
    it('exists', () => {
      expect(routerConfig.routes).toContainEqual(expect.objectContaining({ path: 'browse'}));
    });

    describe('#before', () => {
      let route, pageStub;
      beforeEach(() => {
        pageStub = {
          reset: jest.fn(),
          _Column: {
            appendItems: jest.fn()
          }
        };
        route = getRoute('browse');
        return route.before(pageStub);
      });

      it('calls trending twice', () => {
        expect(fetch).toHaveBeenCalledTimes(2);
      });

      it('calls reset', () => {
        expect(pageStub.reset).toHaveBeenCalled();
      });

      it('updates apiIndex', () => {
        expect(pageStub.apiIndex).toEqual(2);
      });

      it('appends items to column', () => {
        expect(pageStub._Column.appendItems).toHaveBeenCalled();
      });

      it('doesnt load things twice', async () => {
        await route.before(pageStub);
        expect(pageStub.reset).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('movies page', () => {
    it('exists', () => {
      expect(routerConfig.routes).toContainEqual(expect.objectContaining({ path: 'movie/:movieId'}));
    });

    describe('#before', () => {
      let route, pageStub;
      beforeEach(() => {
        pageStub = {
          tag: jest.fn().mockReturnValue({})
        };
        route = getRoute('movie/:movieId');
        return route.before(pageStub, { movieId: 1234 });
      });

      it('sets recommendations', () => {
        expect(pageStub.recommendations.length).toEqual(10);
      });

      it('sets castAndCrew', () => {
        expect(pageStub.castAndCrew.length).toEqual(10);
      });

      it('sets entityInfo', () => {
        expect(pageStub.entityInfo).toEqual(
          expect.objectContaining({
            original_title: 'Dune'
          })
        );
      });

    });
  });

  describe('tv page', () => {
    it('exists', () => {
      expect(routerConfig.routes).toContainEqual(expect.objectContaining({ path: 'tv/:tvId'}));
    });

    describe('#before', () => {
      let route, pageStub;
      beforeEach(() => {
        pageStub = {
          tag: jest.fn().mockReturnValue({})
        };
        route = getRoute('tv/:tvId');
        return route.before(pageStub, { tvId: 1234 });
      });

      it('sets recommendations', () => {
        expect(pageStub.recommendations.length).toEqual(10);
      });

      it('sets castAndCrew', () => {
        expect(pageStub.castAndCrew.length).toEqual(9);
      });

      it('sets entityInfo', () => {
        expect(pageStub.entityInfo).toEqual(
          expect.objectContaining({
            name: 'Squid Game'
          })
        );
      });

    });
  });
});
