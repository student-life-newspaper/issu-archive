import React, { useState, useEffect } from 'react';
import '../../App.css';
import PreviousIssues, { IndividualIssues } from '../../components/PreviousIssues';
import SpecialIssueDetail from './SpecialIssueDetail';

const SPECIAL_ISSUES_PATH = '/special-issues';

const getSpecialIssueSlug = (issue) => issue.thumbURL
  || issue.issueName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getSlugFromPath = () => {
  const prefix = `${SPECIAL_ISSUES_PATH}/`;
  return window.location.pathname.startsWith(prefix)
    ? decodeURIComponent(window.location.pathname.slice(prefix.length))
    : null;
};

const findSpecialIssue = (issues, slug) => {
  if (!slug) return null;

  const previousSpecialIssues = Object.values(issues['Previous Special Issues'] || {})
    .flatMap((year) => year['Special Issues'] || []);
  const allSpecialIssues = [
    ...(issues['Special Issues'] || []),
    ...previousSpecialIssues,
  ];

  return allSpecialIssues.find((issue) => getSpecialIssueSlug(issue) === slug) || null;
};

const SpecialIssue = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [issues, setIssues] = useState(null);
  const [selectedSpecialIssue, setSelectedSpecialIssue] = useState(null);

  useEffect(() => {
    const issuesUrl = `${process.env.PUBLIC_URL}/issues-special.json`;
    // const issuesUrl = 'https://raw.githubusercontent.com/student-life-newspaper/issu-archive/main/public/issues-latest.json';

    fetch(issuesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${issuesUrl}: ${response.status}`);
        }
        return response.json();
      })
      .then((pulledIssues) => {
        setIssues(pulledIssues);
        setIsLoaded(true);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    if (!issues) return undefined;

    const syncRoute = () => {
      setSelectedSpecialIssue(findSpecialIssue(issues, getSlugFromPath()));
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, [issues]);

  const openSpecialIssue = (issue) => {
    const slug = getSpecialIssueSlug(issue);
    window.history.pushState({}, '', `${SPECIAL_ISSUES_PATH}/${encodeURIComponent(slug)}`);
    setSelectedSpecialIssue(issue);
    window.scrollTo(0, 0);
  };

  const closeSpecialIssue = () => {
    window.history.pushState({}, '', SPECIAL_ISSUES_PATH);
    setSelectedSpecialIssue(null);
    window.scrollTo(0, 0);
  };

  const listSpecialIssues = (specialIssues) => (
    <>
      <h1 className="article-headline">Special Issues</h1>
      <IndividualIssues
        issuesArray={specialIssues}
        specialCategory="Special Issues"
        onSpecialIssueSelect={openSpecialIssue}
      />
    </>
  );

  if (error) {
    return (
      <div>
        An error occurred loading this page:
        {' '}
        {error}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (selectedSpecialIssue) {
    return (
      <SpecialIssueDetail
        issue={selectedSpecialIssue}
        onBack={closeSpecialIssue}
      />
    );
  }
  return (
    <>
      {issues['Special Issues'] && listSpecialIssues(issues['Special Issues'])}
      {issues['Previous Special Issues']
        && (
          <PreviousIssues
            issues={issues['Previous Special Issues']}
            isSpecial
            onSpecialIssueSelect={openSpecialIssue}
          />
        )}
    </>
  );
};

export default SpecialIssue;
