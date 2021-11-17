import TestRenderer from '@lightningjs/ui-components/test/lightning-test-renderer';
import NotFound from 'src/pages/NotFound';

describe('NotFound Page', () => {
  let NotFoundPage;
  let testRenderer;
  let page;
  beforeEach(() => {
    NotFoundPage = {
      NotFoundPage: {
        type: NotFound,
      }
    }
    testRenderer = TestRenderer.create(NotFoundPage);
    page = testRenderer.getInstance();
  });

  it('should render', () => {
    let tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
