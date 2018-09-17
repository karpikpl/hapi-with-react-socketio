import React from 'react';
import ReactDOM from 'react-dom';
import VersionInfo from './VersionInfo';
import Nock from 'nock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VersionInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('gets version from the backend', async () => {
    // arrange
    const mock = Nock(/localhost/).get('/api/version')
    .reply(200, 'some version')

    // act
    const div = document.createElement('div');
    ReactDOM.render(<VersionInfo />, div);
    // wait a little bit
    await new Promise(resolve => setTimeout(resolve, 100));
    ReactDOM.unmountComponentAtNode(div);

    // assert
    expect(mock.isDone()).toBeTruthy();
});
