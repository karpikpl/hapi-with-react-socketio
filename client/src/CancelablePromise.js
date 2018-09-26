// created based on https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
import PCancelable from 'p-cancelable';

class CancelablePromise {
  static make(promise) {
    const cancelable = PCancelable.fn((input, onCancel) => {
      // it seems that PCancelable does not support onCancel.shouldReject = false
      // https://github.com/sindresorhus/p-cancelable/pull/11#issuecomment-424473408
      return promise;
    });
    return cancelable();
  }

  constructor(promise) {
    this.hasCanceled = false;

    this.promise = new Promise((resolve, reject) => {
      promise.then(
        value => {
          this.promise = null;
          return this.hasCanceled
            ? reject({ isCanceled: true, value })
            : resolve(value);
        },
        error => {
          this.promise = null;
          this.hasCanceled
            ? reject({ isCanceled: true, error })
            : reject(error);
        }
      );
    });
  }

  cancel() {
    this.hasCanceled = true;
  }
}

export default CancelablePromise;
