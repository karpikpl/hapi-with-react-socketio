import React, { Component } from 'react';
import CancelablePromise from './CancelablePromise';
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter';
import './ApiStatus.css';

class ApiStatus extends Component {
  constructor(props) {
    super(props);

    this.state = { apiStatus: '' };
  }

  componentDidMount() {
    this.fetchData = new CancelablePromise(fetch('/api/isOn'));

    this.fetchData.promise
      .then(response => {
        return response.json().then(obj => {
          this.setState(() => {
            return { apiStatus: obj };
          });
        });
      })
      .catch(error => {
        if (this.fetchData.hasCanceled) return;

        this.setState(() => {
          return { apiStatus: error.message };
        });
      });
  }

  componentWillUnmount() {
    this.fetchData.cancel();
  }

  render() {
    return (
      <div>
        <p className="App-intro">Api status:</p>
        <ReactJsonSyntaxHighlighter obj={this.state.apiStatus} />
      </div>
    );
  }
}

export default ApiStatus;
