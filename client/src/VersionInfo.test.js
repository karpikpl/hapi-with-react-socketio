import React from 'react';
import ReactDOM from 'react-dom';
import VersionInfo from './VersionInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VersionInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
