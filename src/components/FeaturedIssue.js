import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const FeaturedIssue = ({ issueName, embed }) => (
  <>
    <h1 className="article-headline">{issueName}</h1>
    {ReactHtmlParser(embed)}
  </>
);

FeaturedIssue.propTypes = {
  issueName: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
};

export default FeaturedIssue;
