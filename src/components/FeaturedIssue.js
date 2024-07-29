import React from 'react';
import PropTypes from 'prop-types';

const FeaturedIssue = ({ issueName, embed }) => (
  <>
    <h1 className="article-headline">{issueName}</h1>
    <span dangerouslySetInnerHTML={{ __html: embed }} />
  </>
);

FeaturedIssue.propTypes = {
  issueName: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
};

export default FeaturedIssue;
