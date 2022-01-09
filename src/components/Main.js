import React, { useState, useEffect } from 'react';
import '../App.css';
import FeaturedIssue from './FeaturedIssue';
import PreviousIssues from './PreviousIssues';

const Main = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [issues, setIssues] = useState(null);

  useEffect(() => {
    // fetch('https://raw.githubusercontent.com/student-life-newspaper/issu-archive/main/public/issues.json')
    fetch(`${process.env.PUBLIC_URL}/issues.json`)
      .then((response) => response.json())
      .then((pulledIssues) => {
        setIssues(pulledIssues);
        setIsLoaded(true);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const listFeaturedIssues = (featuredIssues) => {
    const featuredIssueComponents = featuredIssues.map((i) => (
      <FeaturedIssue issueName={i.issueName} embed={i.embed} />
    ));
    return (<>{featuredIssueComponents}</>);
  };

  if (error) {
    return (
      <div>
        An error has occured loading this page
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <FeaturedIssue issueName="Latest Issue" embed={issues['Latest Issue'].embed} />
      {issues['Featured Issues'] && listFeaturedIssues(issues['Featured Issues'])}
      {issues['Previous Issues']
        && <PreviousIssues issues={issues['Previous Issues']} />}
    </>
  );
};

export default Main;
