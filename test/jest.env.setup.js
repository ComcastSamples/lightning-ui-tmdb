beforeEach(() => {
  // ensure there's at least one assertion run for every test case
  expect.hasAssertions();
});

// Next step check for unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   if (err) {
//     fail(err);
//   }
// });
