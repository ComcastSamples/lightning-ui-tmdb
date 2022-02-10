import TestRenderer from '@lightningjs/ui-components/test/lightning-test-renderer';
import Entity from 'src/pages/Entity';
import movieProvider from 'src/api/providers/movie';
import tvProvider from 'src/api/providers/tv';

describe('Entity Page', () => {
  let EntityPage;
  let testRenderer;
  let page;
  beforeEach(() => {
    EntityPage = {
      EntityPage: {
        type: Entity,
      }
    }
    testRenderer = TestRenderer.create(EntityPage);
    page = testRenderer.getInstance();
  });

  describe('TV Entity Page', () => {
    beforeEach(() => {
      return tvProvider(page, { tvId: 1234 });
    });

    it('should render', () => {
      let tree = testRenderer.toJSON(3);
      expect(tree).toMatchSnapshot();
    });

    it('should have an open homepage button', () => {
      jest.spyOn(window, 'open').mockImplementation(() => {})
      testRenderer.keyPress('Enter');
      expect(window.open).toHaveBeenCalledWith('https://www.netflix.com/title/81040344');
    });

    it('should load 9 cast and crew tiles', () => {
      expect(page._SectionsContainer.tag('CastAndCrew').items.length).toBe(9);
    });

    it('should load cast and crew with actions', () => {
      jest.spyOn(page, 'navigate').mockImplementation(() => {})
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Enter');
      expect(page.navigate).toHaveBeenCalledWith('people/73249');
    });

    it('should load 10 recommendations', () => {
      expect(page._SectionsContainer.tag('Recommendations').items.length).toBe(10);
    });

    it('should load recommendations with actions', () => {
      jest.spyOn(page, 'navigate').mockImplementation(() => {})
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Enter');
      expect(page.navigate).toHaveBeenCalledWith('tv/110316');
    });
  });

  describe('Movie Entity Page', () => {
    beforeEach(() => {
      return movieProvider(page, { movieId: 1234 });
    });

    it('should render', () => {
      let tree = testRenderer.toJSON(3);
      expect(tree).toMatchSnapshot();
    });

    it('should have an open homepage button', () => {
      jest.spyOn(window, 'open').mockImplementation(() => {})
      testRenderer.keyPress('Enter');
      expect(window.open).toHaveBeenCalledWith('https://www.dunemovie.com/');
    });

    it('should load 10 cast and crew tiles', () => {
      expect(page._SectionsContainer.tag('CastAndCrew').items.length).toBe(10);
    });

    it('should load cast and crew with actions', () => {
      jest.spyOn(page, 'navigate').mockImplementation(() => {})
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Enter');
      expect(page.navigate).toHaveBeenCalledWith('people/1190668');
    });

    it('should load 10 recommendations', () => {
      expect(page._SectionsContainer.tag('Recommendations').items.length).toBe(10);
    });

    it('should have recommendations row', () => {
      expect(page._SectionsContainer.tag('Recommendations').title).toBe('Recommendations');
    });

    it('should load recommendations with actions', () => {
      jest.spyOn(page, 'navigate').mockImplementation(() => {})
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Enter');
      expect(page.navigate).toHaveBeenCalledWith('movie/663260');
    });
  });

  describe('Changing Entity Pages', () => {
    it('should render at the top', async () => {
      await tvProvider(page, { tvId: 1234 });
      testRenderer.keyPress('Down');
      testRenderer.keyPress('Down');
      await movieProvider(page, { movieId: 1234 });
      // Called by router
      page._onChanged();
      let tree = testRenderer.toJSON(3);
      expect(tree).toMatchSnapshot();
    })
  })
});
