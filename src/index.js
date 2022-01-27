import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';

const target = document.getElementById('issu-archive');
ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  target,
);
