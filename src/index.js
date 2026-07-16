const page = process.env.REACT_APP_PAGE || 'latest-issue';

if (page === 'special-issue') {
  import('./pages/special-issue');
} else {
  import('./pages/latest-issue');
}
