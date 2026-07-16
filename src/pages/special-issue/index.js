import React from 'react';
import ReactDOM from 'react-dom';
import './special-issue.css';
import SpecialIssue from './SpecialIssue';

const target = document.getElementById('special-issue');

if (target) {
  ReactDOM.render(
    <React.StrictMode>
      <SpecialIssue />
    </React.StrictMode>,
    target,
  );
}
