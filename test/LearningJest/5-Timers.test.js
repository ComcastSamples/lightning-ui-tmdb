// https://jestjs.io/docs/timer-mocks

/*
* jest.useFakeTimers();
* jest.advanceTimersByTime(1000);
* jest.runOnlyPendingTimers();
* jest.useRealTimers();
*/

describe('Some timer function', () => {
  beforeAll(() => {
      jest.useFakeTimers()
  })

  afterAll(() => {
      jest.useRealTimers()
  })

  it('should run synch', () => {
    expect.assertions(1);
    setTimeout(() => {
      expect(true).toBe(true);
    }, 100)
    jest.runAllTimers();
  })

  it('should advance timers', () => {
    let myVar = false;
    setTimeout(() => {
      myVar = true;
    }, 100)
    jest.advanceTimersByTime(50);
    expect(myVar).toBe(false);
    jest.advanceTimersByTime(50);
    expect(myVar).toBe(true);
  })
});
