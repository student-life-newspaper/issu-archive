import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const THUMBNAIL_URL = 'https://studlife.com/media/pdf/';

const PreviousIssues = ({ previousIssues }) => {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubdivisionChange = (panel) => (event, isExpanded) => {
    setSubExpanded(isExpanded ? panel : false);
  };

  const subdivisionAccordion = (subdivisions, year) => Object.entries(subdivisions).map((e) => {
    const division = e[0];
    return (
      <Accordion expanded={subExpanded === `panel-${year}-${division}`} onChange={handleSubdivisionChange(`panel-${year}-${division}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${year}-${division}-content`}
          id={`${year}-${division}-header`}
        >
          {division}
        </AccordionSummary>
        <AccordionDetails>
          'test'
        </AccordionDetails>
      </Accordion>
    );
  });

  const yearsAccordion = () => {
    const elements = Object.entries(previousIssues).map((e) => {
      const year = e[0];
      return (
        <Accordion expanded={expanded === `panel-${year}`} onChange={handleChange(`panel-${year}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-content`}
            id={`${year}-header`}
          >
            {year}
          </AccordionSummary>
          <AccordionDetails>
            {subdivisionAccordion(e[1], year)}
          </AccordionDetails>
        </Accordion>
      );
    });
    return elements;
  };

  return (
    <>
      {yearsAccordion()}
    </>
  );
};

export default PreviousIssues;
