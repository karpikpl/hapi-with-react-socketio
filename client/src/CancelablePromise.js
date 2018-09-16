
class CancelablePromise {

    constructor(promise) {
        this.hasCanceled = false;

        this.promise = new Promise((resolve, reject) => {
         promise.then(
           val => this.hasCanceled ? reject({isCanceled: true}) : resolve(val),
           error => this.hasCanceled ? reject({isCanceled: true}) : reject(error)
         );
       });
    }

    cancel() {
      this.hasCanceled = true;
    }
}



export default CancelablePromise;
