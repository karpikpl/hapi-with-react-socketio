import CancelablePromise from './CancelablePromise';
import { iterate } from 'leakage';
import PCancelable from 'p-cancelable';

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

it('can returns the error when promise fails', done => {
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

// 'leakage' library requires tests to run sequentially using JEST param --runInBand,
// however, FB does't allow to specify parameters for JEST so only one test is allowed :(
it.skip('CancelablePromise does not leak when canceled', async () => {
  let i = 0;
  expect.hasAssertions();
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

  await iterate.async(async () => {
    let dummyPromise = new Promise(resolve => {
      setTimeout(() => resolve('ok ' + ++i), 1);
    });
    const cancelable = new CancelablePromise(dummyPromise);
    try {
      cancelable.cancel();
      await cancelable.promise;
    } catch (e) {
      expect(e.isCanceled).toBeTruthy();
    }
  });
});

// should standard promise leak memory? asked question here: https://github.com/andywer/leakage/issues/30
it('CancelablePromise does not leak when resolved', async () => {
  let i = 0;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  expect.hasAssertions();

  await iterate.async(async () => {
    let dummyPromise = new Promise(resolve => {
      setTimeout(() => resolve('ok ' + ++i), 1);
    });
    //const cancelable = CancelablePromise.make(dummyPromise);
    try {
      const result = await dummyPromise;
      console.log('got result', result);
      expect(result).toBeTruthy();
    } catch (e) {
      throw 'this should not happen ' + e;
    }
  });
});
