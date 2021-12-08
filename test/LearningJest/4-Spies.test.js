/*
When to use a Spy vs Stub
In computing, an idempotent operation is one that has no additional effect
if it is called more than once with the same input parameters.
https://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation
*/

function getBrews() {
  // console.log('Get Brews Called');
  return fetch('https://api.openbrewerydb.org/breweries')
    .then(response => response.json())
}

it.skip('handles functions that throw errors', () => {
  // Make sure to disable fetch-mock if you want to see this working
  expect(() => getBrews()).toThrow();
});


it('supports spies and stubbing', () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true })
    })
  });

  return expect(getBrews()).resolves.toEqual({ success: true })
});

it('keeps the spy going between tests?', () => {
  return expect(getBrews()).resolves.toEqual({ success: true })
});


it('resets the counters', async () => {
  expect(fetch).not.toHaveBeenCalled();
  await getBrews();
  expect(fetch).toHaveBeenCalled();
});


it.skip('can be restored', () => {
  fetch.mockRestore();
  expect(() => getBrews()).toThrow();
});
