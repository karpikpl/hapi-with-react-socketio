import React, { Component } from 'react';

class VersionInfo extends Component {

  constructor(props) {
      super(props);

      this.state = { version: '' };
  }

  componentDidMount() {

    fetch('/api/version').then((response) => {

      return response.text().then((txt) => {
          this.setState(() => {
              return { version: txt };
          });
      });

    }).catch((error) => {
        this.setState(() => {
            return { version: error.message };
        });
    });
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
