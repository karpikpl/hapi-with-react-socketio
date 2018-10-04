import React from 'react';
import ReactDOM from 'react-dom';
import VersionInfo from './VersionInfo';
// using fetch-mock instead of nock because of: https://github.com/nock/nock/issues/591
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
  // wait a little bit so that response from the mock is processed before component is unmounted
  await new Promise(resolve => setTimeout(resolve, 100));
  const result = div.innerHTML;

  // cleanup
  mock.reset();
  ReactDOM.unmountComponentAtNode(div);
  // assert
  expect(mock.done()).toBeTruthy();
  expect(result).toMatch(/some version/);
});

it('displays error when backend call fails', async () => {
  // arrange
  const mock = FetchMock.mock('/api/version', {
    throws: new Error('some error')
  });

  // act
  const div = document.createElement('div');
  ReactDOM.render(<VersionInfo />, div);
  // wait a little bit so that response from the mock is processed before component is unmounted
  await new Promise(resolve => setTimeout(resolve, 500));
  const result = div.innerHTML;

  // cleanup
  mock.reset();
  ReactDOM.unmountComponentAtNode(div);

  // assert
  expect(mock.done()).toBeTruthy();
  expect(result).toMatch(/some error/);
});
