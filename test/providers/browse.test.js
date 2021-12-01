import browseProvider from 'src/api/providers/browse.js';

describe('browse provider', () => {
  let pageStub;
  beforeEach(() => {
    pageStub = {
      reset: jest.fn(),
      _Column: {
        appendItems: jest.fn()
      }
    };
    return browseProvider(pageStub);
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
    await browseProvider(pageStub);
    expect(pageStub.reset).toHaveBeenCalledTimes(1);
  });
});
