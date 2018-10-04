import React from 'react';
import ReactDOM from 'react-dom';
import ApiStatus from './ApiStatus';
import FetchMock from 'fetch-mock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApiStatus />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('gets API status from the backend', async () => {
  // arrange
  const mock = FetchMock.mock('/api/isOn', { isOn: true });

  // act
  const div = document.createElement('div');
  ReactDOM.render(<ApiStatus />, div);
  // wait a little bit so that response from the mock is processed before component is unmounted
  await new Promise(resolve => setTimeout(resolve, 100));
  const result = div.innerHTML;

  // cleanup
  mock.reset();
  ReactDOM.unmountComponentAtNode(div);
  // assert
  expect(mock.done()).toBeTruthy();
  expect(result).toMatch(/isOn.+true/);
});

it('doesnt crash when API call fails', async () => {
  // arrange
  const mock = FetchMock.mock('/api/isOn', { throws: new Error('some error') });

  // act
  const div = document.createElement('div');
  ReactDOM.render(<ApiStatus />, div);
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
