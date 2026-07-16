import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import '../../App.css';
import LatestIssue from './LatestIssue';

const target = document.getElementById('latest-issue');

if (target) {
  ReactDOM.render(
    <React.StrictMode>
      <LatestIssue />
    </React.StrictMode>,
    target,
  );
}
