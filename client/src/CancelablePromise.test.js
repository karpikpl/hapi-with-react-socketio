import CancelablePromise from './CancelablePromise';

it('does not resolve cancelled promises', done => {
  const dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 50);
  });
  const cancelable = new CancelablePromise(dummyPromise);

  // Act
  cancelable.promise
    .then(value => {
      throw 'canceled promise should not be resolved';
    })
    .catch(err => {
      expect(err).toBeTruthy();
      done();
    });
  cancelable.cancel();

  // Assert
  expect(cancelable.hasCanceled).toEqual(true);
});

it('can be cancelled multiple times', done => {
  const dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 50);
  });
  const cancelable = new CancelablePromise(dummyPromise);

  // Act
  cancelable.promise
    .then(value => {
      throw 'canceled promise should not be resolved';
    })
    .catch(err => {
      expect(err).toBeTruthy();
      done();
    });
  cancelable.cancel();
  cancelable.cancel();
  cancelable.cancel();

  // Assert
  expect(cancelable.hasCanceled).toEqual(true);
});

it('returns the error when promise fails', done => {
  const dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('my error'), 50);
  });
  const cancelable = new CancelablePromise(dummyPromise);

  // Act
  cancelable.promise
    .then(value => {
      throw 'canceled promise should not be resolved';
    })
    .catch(err => {
      expect(err.error).toBe('my error');
      done();
    });
  cancelable.cancel();

  // Assert
  expect(cancelable.hasCanceled).toEqual(true);
});
