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
        iaYear, iaCategory, iaMonth, iaDate, iaIsSpecial,
      } = parsed;

      if (!iaYear || !iaCategory || !iaDate) return;
      if (!iaMonth && !iaIsSpecial) return;

      const containerArray = iaIsSpecial
        ? issues['Previous Issues'][iaYear][iaCategory]
        : issues['Previous Issues'][iaYear][iaCategory][iaMonth];
      const filteredIssues = containerArray.filter((i) => i.date === iaDate);

      if (filteredIssues.length === 1) {
        const issueObj = filteredIssues[0];
        const dateOptions = {
          year: 'numeric', month: 'long', day: 'numeric',
        };
        if (!iaIsSpecial) {
          issueObj.issueName = new Date(iaDate).toLocaleDateString('en-US', dateOptions);
          issueObj.isSpecial = false;
        } else {
          issueObj.isSpecial = true;
          issueObj.category = iaCategory;
        }
        setIssueFromURL(issueObj);
        setModalOpen(true);
      }
    };
    if (window.location.search && issues) parseQueryString(window.location.search);
  }, [issues]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/student-life-newspaper/issu-archive/main/public/issues.json')
    // fetch(`${process.env.PUBLIC_URL}/issues.json`)
      .then((response) => response.json())
      .then((pulledIssues) => {
        setIssues(pulledIssues);
        setIsLoaded(true);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  const listFeaturedIssues = (featuredIssues) => {
    const featuredIssueComponents = featuredIssues.map((i) => (
      <FeaturedIssue issueName={i.issueName} embed={i.embed} key={`fi-${i}`} />
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
