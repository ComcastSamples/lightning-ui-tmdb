import tvProvider from 'src/api/providers/tv.js';

describe('tv provider', () => {
  let pageStub;
  beforeEach(() => {
    pageStub = {
      tag: jest.fn().mockReturnValue({})
    };
    return tvProvider(pageStub, { tvId: 1234 });
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
