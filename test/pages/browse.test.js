import TestRenderer from '@lightningjs/ui-components/test/lightning-test-renderer';
import Browse from 'src/pages/Browse';
import { Router } from '@lightningjs/sdk';
import browseProvider from 'src/api/providers/browse'

describe('Browse Page', () => {
  let BrowsePage;
  let testRenderer;
  let page;
  beforeEach(() => {
    BrowsePage = {
      BrowsePage: {
        type: Browse,
      }
    }
    testRenderer = TestRenderer.create(BrowsePage);
    page = testRenderer.getInstance();
    return browseProvider(page);
  });

  it('should render', () => {
    let tree = testRenderer.toJSON(3);
    expect(page._Column.items.length).toBe(5);
    expect(tree).toMatchSnapshot();
  });

  it('should navigate on tile enter', () => {
    jest.spyOn(Router, 'navigate').mockImplementation(() => {})
    testRenderer.keyPress('Enter');
    expect(Router.navigate).toHaveBeenCalledWith('movie/438631');
  });

  it('should load more rows', () => {
    jest.spyOn(page, 'getMoreRows');
    testRenderer.keyPress('Down');
    testRenderer.keyPress('Down');
    testRenderer.keyPress('Down');
    testRenderer.keyPress('Down');
    expect(page.getMoreRows).toHaveBeenCalled();
  });

});
