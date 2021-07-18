import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';

const target = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  target
);