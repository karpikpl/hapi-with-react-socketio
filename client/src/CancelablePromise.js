// created based on https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
class CancelablePromise {
  constructor(promise) {
    this.hasCanceled = false;

    this.promise = new Promise((resolve, reject) => {
      promise.then(
        value =>
          this.hasCanceled
            ? reject({ isCanceled: true, value })
            : resolve(value),
        error =>
          this.hasCanceled ? reject({ isCanceled: true, error }) : reject(error)
      );
    });
  }

  cancel() {
    this.hasCanceled = true;
  }
}

export default CancelablePromise;
