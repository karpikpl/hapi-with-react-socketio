// created based on https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
class CancelablePromise {
  constructor(promise) {
    this.hasCanceled = false;

    this.promise = new Promise((resolve, reject) => {
      promise.then(
        val => (this.hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
        error =>
          this.hasCanceled ? reject({ isCanceled: true }) : reject(error)
      );
    });
  }

  cancel() {
    this.hasCanceled = true;
    this.promise = null;
  }
}

export default CancelablePromise;
