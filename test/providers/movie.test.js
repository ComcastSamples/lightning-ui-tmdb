import movieProvider from 'src/api/providers/movie.js';

describe('movie provider', () => {
  let pageStub;
  beforeEach(() => {
    pageStub = {
      tag: jest.fn().mockReturnValue({})
    };
    return movieProvider(pageStub, { movieId: 1234 });
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
