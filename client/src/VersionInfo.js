import React, { Component } from 'react';
import CancelablePromise from './CancelablePromise';

class VersionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { version: '' };
  }

  componentDidMount() {
    this.fetchData = new CancelablePromise(fetch('/api/version'));

    this.fetchData.promise
      .then(response => {
        return response.text().then(txt => {
          this.setState(() => {
            return { version: txt };
          });
        });
      })
      .catch(error => {
        if (this.fetchData.hasCanceled) return;

        this.setState(() => {
          return { version: error.message };
        });
      });
  }

  componentWillUnmount() {
    this.fetchData.cancel();
  }

  render() {
    return (
      <p className="App-intro">
        Api says: <strong>{this.state.version}</strong>
      </p>
    );
  }
}

export default VersionInfo;
