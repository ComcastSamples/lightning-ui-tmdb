it("supports mocking", () => {
  const mockCallback = jest.fn(x => 42 + x);
  // do some test
  mockCallback(10);
  mockCallback(20);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(10);
  // Or
  expect(mockCallback).toBeCalledWith(10);


  expect(mockCallback.mock.calls.length).toBe(2);
  // Or
  expect(mockCallback).toHaveBeenCalledTimes(2);


  expect(mockCallback(30)).toEqual(72);
  mockCallback.mockReturnValueOnce(42);
  // Or mockCallback.mockReturnValue(42) to always be 42;
  expect(mockCallback(30)).toEqual(42);
  expect(mockCallback(30)).toEqual(72);

  //Promises!
  mockCallback.mockResolvedValue(42);
  return expect(mockCallback(30)).resolves.toEqual(42);
});
