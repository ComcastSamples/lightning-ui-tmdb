const fetchDataCB = function(cb) {
  setTimeout(() => cb('peanut butter'), 1);
}

const fetchData = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('peanut butter'), 1);
  })
}

const fetchDataReject = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('error'), 1);
  })
}

// Don't do this!
test.skip('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchDataCB(callback);
});

test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchDataCB(callback);
});


test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchDataReject().catch(e => expect(e).toMatch('error'));
});

test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchDataReject();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchDataReject()).rejects.toMatch('error');
});
