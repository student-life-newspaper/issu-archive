import React from 'react';

const SpecialIssueDetail = ({ issue, onBack }) => (
  <article className="special-issue-detail">
    <button type="button" className="special-issue-detail__back" onClick={onBack}>
      Back to special issues
    </button>

    <header>
      <p className="special-issue-detail__eyebrow">Special Issue</p>
      <h1>{issue.issueName}</h1>
      <p>{issue.date}</p>
    </header>

    <section className="special-issue-detail__content">
      {/* Add the special issue's articles, description, or embedded reader here. */}
      <div dangerouslySetInnerHTML={{ __html: issue.embed }} />
    </section>
  </article>
);

export default SpecialIssueDetail;
