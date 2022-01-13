import React, { useState, useEffect } from 'react';
import '../App.css';
import queryString from 'query-string';
import FeaturedIssue from './FeaturedIssue';
import PreviousIssues from './PreviousIssues';
import SelectedIssueModal from './SelectedIssueModal';

const Main = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [issues, setIssues] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [issueFromURL, setIssueFromURL] = useState({});

  useEffect(() => {
    const parseQueryString = () => {
      const parsed = queryString.parse(window.location.search);
      const {
        year, category, month, date, isSpecial,
      } = parsed;

      if (!year || !category || !date) return;
      if (!month && !isSpecial) return;

      const containerArray = isSpecial
        ? issues['Previous Issues'][year][category]
        : issues['Previous Issues'][year][category][month];
      const filteredIssues = containerArray.filter((i) => i.date === date);

      if (filteredIssues.length === 1) {
        const issueObj = filteredIssues[0];
        const dateOptions = {
          year: 'numeric', month: 'long', day: 'numeric',
        };
        if (!isSpecial) {
          issueObj.issueName = new Date(date).toLocaleDateString('en-US', dateOptions);
          issueObj.isSpecial = false;
        } else {
          issueObj.isSpecial = true;
          issueObj.category = category;
        }
        setIssueFromURL(issueObj);
        setModalOpen(true);
      }
    };
    if (window.location.search && issues) parseQueryString(window.location.search);
  }, [issues]);

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
      {(modalOpen && issueFromURL !== {}) && (
        <SelectedIssueModal
          issueObj={issueFromURL}
          modalOpen
          setModalOpen={setModalOpen}
        />
      )}
      <FeaturedIssue issueName="Latest Issue" embed={issues['Latest Issue'].embed} />
      {issues['Featured Issues'] && listFeaturedIssues(issues['Featured Issues'])}
      {issues['Previous Issues']
        && <PreviousIssues issues={issues['Previous Issues']} />}
    </>
  );
};

export default Main;
