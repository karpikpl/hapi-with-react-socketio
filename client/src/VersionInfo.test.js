import React from 'react';
import ReactDOM from 'react-dom';
import VersionInfo from './VersionInfo';
import FetchMock from 'fetch-mock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VersionInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('gets version from the backend', async () => {
    // arrange
    const mock = FetchMock.mock('/api/version', 'some version');

    // act
    const div = document.createElement('div');
    ReactDOM.render(<VersionInfo />, div);
    // wait a little bit
    await new Promise(resolve => setTimeout(resolve, 100));
    //ReactDOM.unmountComponentAtNode(div);

    // cleanup
    mock.reset();
    // assert
    expect(mock.done()).toBeTruthy();
});

it('displays error when backend call fails', async () => {
    // arrange
    const mock = FetchMock.mock('/api/version', { throws: 'some error'});

    // act
    const div = document.createElement('div');
    ReactDOM.render(<VersionInfo />, div);
    // wait a little bit
    await new Promise(resolve => setTimeout(resolve, 100));
    //ReactDOM.unmountComponentAtNode(div);

    // cleanup
    mock.reset();

    // assert
    expect(mock.done()).toBeTruthy();
});
